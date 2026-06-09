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
      const token = randomHex(32);

      await env.DB.batch([
        env.DB.prepare(
          "INSERT INTO users (id, email, name, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(user.id, user.email, user.name, user.password_hash, user.created_at, user.updated_at),
        env.DB.prepare(
          "INSERT INTO sessions (token, user_id, created_at, last_seen_at) VALUES (?, ?, ?, ?)"
        ).bind(token, user.id, now(), now())
      ]);

      return send({ user: publicUser(user), token }, 201, origin);
    }

    if (request.method === "POST" && url.pathname === "/auth/login") {
      const body = await readBody(request);
      const email = normalizeEmail(body.email);
      const user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
      if (!user || !(await verifyPassword(body.password || "", user.password_hash))) {
        return send({ error: "INVALID_CREDENTIALS", message: "Email o clave incorrectos." }, 401, origin);
      }
      const token = randomHex(32);
      await env.DB.prepare(
        "INSERT INTO sessions (token, user_id, created_at, last_seen_at) VALUES (?, ?, ?, ?)"
      ).bind(token, user.id, now(), now()).run();
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
