const MAX_BODY_BYTES = 8 * 1024 * 1024;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function now() {
  return new Date().toISOString();
}

function jsonHeaders(origin = "*") {
  return {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET,POST,PUT,OPTIONS",
    "access-control-allow-headers": "content-type, authorization"
  };
}

function send(payload, status = 200, origin = "*") {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: jsonHeaders(origin)
  });
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function randomHex(bytes = 24) {
  const values = new Uint8Array(bytes);
  crypto.getRandomValues(values);
  return bytesToHex(values);
}

function timingSafeEqual(a, b) {
  const left = encoder.encode(String(a || ""));
  const right = encoder.encode(String(b || ""));
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left[index] ^ right[index];
  }
  return diff === 0;
}

async function hashPassword(password, salt = randomHex(16)) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(String(password)),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );
  return `${salt}:${bytesToHex(new Uint8Array(bits))}`;
}

async function verifyPassword(password, storedHash) {
  const [salt, expected] = String(storedHash || "").split(":");
  if (!salt || !expected) return false;
  const actual = (await hashPassword(password, salt)).split(":")[1];
  return timingSafeEqual(actual, expected);
}

async function readBody(request) {
  const text = await request.text();
  if (encoder.encode(text).length > MAX_BODY_BYTES) {
    throw new Error("BODY_TOO_LARGE");
  }
  return text ? JSON.parse(text) : {};
}

function getToken(request) {
  const auth = request.headers.get("authorization") || "";
  return auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  };
}

function sanitizePublicShareData(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const total = Number(data.total || 0);
  if (!Number.isFinite(total) || total <= 0) return null;
  const trim = (value, fallback = "") => String(value || fallback).replace(/\s+/g, " ").trim().slice(0, 60);
  const codes = (value) => (Array.isArray(value) ? value.map((code) => trim(code).toUpperCase()).filter(Boolean).slice(0, 360) : []);
  return {
    v: 2,
    name: trim(data.name, "Coleccionista mundialista"),
    city: trim(data.city),
    progress: Math.max(0, Math.min(100, Number(data.progress || 0))),
    owned: Math.max(0, Number(data.owned || 0)),
    total: Math.max(0, total),
    missing: Math.max(0, Number(data.missing || 0)),
    duplicates: Math.max(0, Number(data.duplicates || 0)),
    priority: Math.max(0, Number(data.priority || 0)),
    m: codes(data.m),
    d: codes(data.d),
    capped: Boolean(data.capped),
    at: trim(data.at)
  };
}

async function ensurePublicSharesTable(env) {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS public_shares (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`
  ).run();
}

async function createSession(env, userId) {
  const token = randomHex(32);
  await env.DB.prepare(
    "INSERT INTO sessions (token, user_id, created_at, last_seen_at) VALUES (?, ?, ?, ?)"
  ).bind(token, userId, now(), now()).run();
  return token;
}

async function requireUser(request, env) {
  const token = getToken(request);
  if (!token) return null;
  const session = await env.DB.prepare("SELECT * FROM sessions WHERE token = ?").bind(token).first();
  if (!session) return null;
  const user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(session.user_id).first();
  if (!user) return null;
  await env.DB.prepare("UPDATE sessions SET last_seen_at = ? WHERE token = ?").bind(now(), token).run();
  return user;
}

async function handleRequest(request, env) {
  const origin = env.ALLOWED_ORIGIN || "*";

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: jsonHeaders(origin) });
  }

  const url = new URL(request.url);

  try {
    if (request.method === "GET" && url.pathname === "/health") {
      let database = "missing";
      if (env.DB) {
        try {
          await env.DB.prepare("SELECT 1").first();
          database = "connected";
        } catch (error) {
          database = "error";
        }
      }
      return send({
        ok: true,
        service: "album-mundialista-api",
        version: "1.0.0-cloudflare",
        database,
        time: now()
      }, 200, origin);
    }

    if (request.method === "GET" && url.pathname === "/auth/config") {
      return send({
        googleClientId: env.GOOGLE_CLIENT_ID || ""
      }, 200, origin);
    }

    if (request.method === "POST" && url.pathname === "/public/share") {
      if (!env.DB) return send({ error: "DB_MISSING", message: "Base de datos no configurada." }, 500, origin);
      const body = await readBody(request);
      const data = sanitizePublicShareData(body.data);
      if (!data) return send({ error: "INVALID_SHARE", message: "El resumen publico no es valido." }, 400, origin);
      await ensurePublicSharesTable(env);
      const id = randomHex(5);
      const createdAt = now();
      await env.DB.prepare("INSERT INTO public_shares (id, data, created_at) VALUES (?, ?, ?)")
        .bind(id, JSON.stringify(data), createdAt)
        .run();
      return send({ id, url: `${url.origin}/?share=${id}`, createdAt }, 201, origin);
    }

    if (request.method === "GET" && url.pathname.startsWith("/public/share/")) {
      if (!env.DB) return send({ error: "DB_MISSING", message: "Base de datos no configurada." }, 500, origin);
      const id = url.pathname.split("/").pop() || "";
      if (!/^[a-f0-9]{8,24}$/i.test(id)) {
        return send({ error: "INVALID_SHARE", message: "Enlace publico invalido." }, 400, origin);
      }
      await ensurePublicSharesTable(env);
      const row = await env.DB.prepare("SELECT * FROM public_shares WHERE id = ?").bind(id.toLowerCase()).first();
      if (!row) return send({ error: "NOT_FOUND", message: "Enlace publico no encontrado." }, 404, origin);
      return send({ id: row.id, data: JSON.parse(row.data), createdAt: row.created_at }, 200, origin);
    }

    if (request.method === "POST" && url.pathname === "/auth/register") {
      const body = await readBody(request);
      const email = normalizeEmail(body.email);
      const password = String(body.password || "");
      const name = String(body.name || "").trim();
      if (!email || !email.includes("@") || password.length < 6) {
        return send({ error: "INVALID_INPUT", message: "Email valido y clave de minimo 6 caracteres." }, 400, origin);
      }

      const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
      if (existing) {
        return send({ error: "EMAIL_EXISTS", message: "Ese email ya existe." }, 409, origin);
      }

      const user = {
        id: randomHex(12),
        email,
        name: name || email.split("@")[0],
        password_hash: await hashPassword(password),
        created_at: now(),
        updated_at: now()
      };
      await env.DB.batch([
        env.DB.prepare(
          "INSERT INTO users (id, email, name, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(user.id, user.email, user.name, user.password_hash, user.created_at, user.updated_at),
      ]);
      const token = await createSession(env, user.id);

      return send({ user: publicUser(user), token }, 201, origin);
    }

    if (request.method === "POST" && url.pathname === "/auth/login") {
      const body = await readBody(request);
      const email = normalizeEmail(body.email);
      const user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
      if (!user || !(await verifyPassword(body.password || "", user.password_hash))) {
        return send({ error: "INVALID_CREDENTIALS", message: "Email o clave incorrectos." }, 401, origin);
      }
      const token = await createSession(env, user.id);
      return send({ user: publicUser(user), token }, 200, origin);
    }

    if (request.method === "POST" && url.pathname === "/auth/google") {
      if (!env.GOOGLE_CLIENT_ID) {
        return send({ error: "GOOGLE_NOT_CONFIGURED", message: "Falta configurar Google Client ID." }, 400, origin);
      }
      const body = await readBody(request);
      const credential = String(body.credential || "");
      if (!credential) {
        return send({ error: "INVALID_INPUT", message: "Falta token de Google." }, 400, origin);
      }
      const verifyResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
      const verified = await verifyResponse.json();
      if (!verifyResponse.ok || verified.aud !== env.GOOGLE_CLIENT_ID || !["true", true].includes(verified.email_verified)) {
        return send({ error: "INVALID_GOOGLE_TOKEN", message: "No pude validar Google." }, 401, origin);
      }
      const email = normalizeEmail(verified.email);
      const name = String(verified.name || email.split("@")[0]).trim();
      let user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
      if (!user) {
        user = {
          id: `google-${verified.sub}`,
          email,
          name,
          password_hash: `google:${verified.sub}`,
          created_at: now(),
          updated_at: now()
        };
        await env.DB.prepare(
          "INSERT INTO users (id, email, name, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(user.id, user.email, user.name, user.password_hash, user.created_at, user.updated_at).run();
      } else {
        await env.DB.prepare("UPDATE users SET name = ?, updated_at = ? WHERE id = ?").bind(name, now(), user.id).run();
        user = { ...user, name, updated_at: now() };
      }
      const token = await createSession(env, user.id);
      return send({ user: publicUser(user), token }, 200, origin);
    }

    if (request.method === "GET" && url.pathname === "/me") {
      const user = await requireUser(request, env);
      if (!user) return send({ error: "UNAUTHORIZED", message: "Token invalido o ausente." }, 401, origin);
      return send({ user: publicUser(user) }, 200, origin);
    }

    if (request.method === "GET" && url.pathname === "/sync/album") {
      const user = await requireUser(request, env);
      if (!user) return send({ error: "UNAUTHORIZED", message: "Token invalido o ausente." }, 401, origin);
      const album = await env.DB.prepare("SELECT * FROM albums WHERE user_id = ?").bind(user.id).first();
      return send(album ? {
        data: album.data ? JSON.parse(album.data) : null,
        updatedAt: album.updated_at,
        clientSyncId: album.client_sync_id || ""
      } : { data: null, updatedAt: null }, 200, origin);
    }

    if (request.method === "PUT" && url.pathname === "/sync/album") {
      const user = await requireUser(request, env);
      if (!user) return send({ error: "UNAUTHORIZED", message: "Token invalido o ausente." }, 401, origin);
      const body = await readBody(request);
      if (!body.data?.album || !body.data?.stickers || !body.data?.sections) {
        return send({ error: "INVALID_ALBUM", message: "El payload no parece una coleccion valida." }, 400, origin);
      }
      const updatedAt = now();
      const syncId = body.syncId || body.data.profile?.syncId || "";
      await env.DB.batch([
        env.DB.prepare(
          `INSERT INTO albums (user_id, data, updated_at, client_sync_id)
           VALUES (?, ?, ?, ?)
           ON CONFLICT(user_id) DO UPDATE SET
             data = excluded.data,
             updated_at = excluded.updated_at,
             client_sync_id = excluded.client_sync_id`
        ).bind(user.id, JSON.stringify(body.data), updatedAt, syncId),
        env.DB.prepare("UPDATE users SET updated_at = ? WHERE id = ?").bind(updatedAt, user.id)
      ]);
      return send({ ok: true, updatedAt }, 200, origin);
    }

    return send({ error: "NOT_FOUND", message: "Ruta no encontrada." }, 404, origin);
  } catch (error) {
    if (error.message === "BODY_TOO_LARGE") {
      return send({ error: "BODY_TOO_LARGE", message: "Payload demasiado grande." }, 413, origin);
    }
    return send({
      error: "SERVER_ERROR",
      message: "Error interno de la API.",
      ...(env.DEBUG_ERRORS === "1" ? { detail: error.message } : {})
    }, 500, origin);
  }
}

export default {
  fetch: handleRequest
};
