import { createServer } from "node:http";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "storage", "db.json");
const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "127.0.0.1";
const MAX_BODY_BYTES = 8 * 1024 * 1024;

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,PUT,OPTIONS",
  "access-control-allow-headers": "content-type, authorization"
};

function now() {
  return new Date().toISOString();
}

function send(response, status, payload) {
  response.writeHead(status, jsonHeaders);
  response.end(JSON.stringify(payload, null, 2));
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, hash] = String(storedHash || "").split(":");
  if (!salt || !hash) return false;
  const actual = Buffer.from(hashPassword(password, salt).split(":")[1], "hex");
  const expected = Buffer.from(hash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

async function ensureDb() {
  await mkdir(dirname(DB_PATH), { recursive: true });
  try {
    const db = JSON.parse(await readFile(DB_PATH, "utf8"));
    db.users = db.users || [];
    db.sessions = db.sessions || [];
    db.albums = db.albums || {};
    db.publicShares = db.publicShares || {};
    return db;
  } catch (error) {
    return { users: [], sessions: [], albums: {}, publicShares: {} };
  }
}

async function saveDb(db) {
  const temp = `${DB_PATH}.tmp`;
  await writeFile(temp, JSON.stringify(db, null, 2), "utf8");
  await rename(temp, DB_PATH);
}

async function readBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error("BODY_TOO_LARGE");
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function getToken(request) {
  const auth = request.headers.authorization || "";
  return auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
}

function findSession(db, token) {
  if (!token) return null;
  return db.sessions.find((session) => session.token === token) || null;
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
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

function createSession(db, userId) {
  const token = randomBytes(32).toString("hex");
  db.sessions.push({ token, userId, createdAt: now(), lastSeenAt: now() });
  return token;
}

async function requireUser(request, response, db) {
  const session = findSession(db, getToken(request));
  if (!session) {
    send(response, 401, { error: "UNAUTHORIZED", message: "Token invalido o ausente." });
    return null;
  }
  const user = db.users.find((item) => item.id === session.userId);
  if (!user) {
    send(response, 401, { error: "UNAUTHORIZED", message: "Usuario no encontrado." });
    return null;
  }
  session.lastSeenAt = now();
  return user;
}

async function handleRequest(request, response) {
  if (request.method === "OPTIONS") {
    response.writeHead(204, jsonHeaders);
    response.end();
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  const db = await ensureDb();

  try {
    if (request.method === "GET" && url.pathname === "/health") {
      send(response, 200, {
        ok: true,
        service: "album-mundialista-api",
        version: "1.0.0",
        time: now()
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/auth/config") {
      send(response, 200, { googleClientId: process.env.GOOGLE_CLIENT_ID || "" });
      return;
    }

    if (request.method === "POST" && url.pathname === "/public/share") {
      const body = await readBody(request);
      const data = sanitizePublicShareData(body.data);
      if (!data) {
        send(response, 400, { error: "INVALID_SHARE", message: "El resumen publico no es valido." });
        return;
      }
      const id = randomBytes(5).toString("hex");
      const createdAt = now();
      db.publicShares[id] = { data, createdAt };
      await saveDb(db);
      send(response, 201, { id, url: `${url.origin}/?share=${id}`, createdAt });
      return;
    }

    if (request.method === "GET" && url.pathname.startsWith("/public/share/")) {
      const id = url.pathname.split("/").pop() || "";
      if (!/^[a-f0-9]{8,24}$/i.test(id)) {
        send(response, 400, { error: "INVALID_SHARE", message: "Enlace publico invalido." });
        return;
      }
      const share = db.publicShares[id.toLowerCase()];
      if (!share) {
        send(response, 404, { error: "NOT_FOUND", message: "Enlace publico no encontrado." });
        return;
      }
      send(response, 200, { id: id.toLowerCase(), data: share.data, createdAt: share.createdAt });
      return;
    }

    if (request.method === "POST" && url.pathname === "/auth/register") {
      const body = await readBody(request);
      const email = normalizeEmail(body.email);
      const password = String(body.password || "");
      const name = String(body.name || "").trim();
      if (!email || !email.includes("@") || password.length < 6) {
        send(response, 400, { error: "INVALID_INPUT", message: "Email valido y clave de minimo 6 caracteres." });
        return;
      }
      if (db.users.some((user) => user.email === email)) {
        send(response, 409, { error: "EMAIL_EXISTS", message: "Ese email ya existe." });
        return;
      }
      const user = {
        id: randomBytes(12).toString("hex"),
        email,
        name: name || email.split("@")[0],
        passwordHash: hashPassword(password),
        createdAt: now(),
        updatedAt: now()
      };
      db.users.push(user);
      const token = createSession(db, user.id);
      await saveDb(db);
      send(response, 201, { user: publicUser(user), token });
      return;
    }

    if (request.method === "POST" && url.pathname === "/auth/login") {
      const body = await readBody(request);
      const email = normalizeEmail(body.email);
      const user = db.users.find((item) => item.email === email);
      if (!user || !verifyPassword(body.password || "", user.passwordHash)) {
        send(response, 401, { error: "INVALID_CREDENTIALS", message: "Email o clave incorrectos." });
        return;
      }
      const token = createSession(db, user.id);
      await saveDb(db);
      send(response, 200, { user: publicUser(user), token });
      return;
    }

    if (request.method === "POST" && url.pathname === "/auth/google") {
      if (!process.env.GOOGLE_CLIENT_ID) {
        send(response, 400, { error: "GOOGLE_NOT_CONFIGURED", message: "Falta configurar Google Client ID." });
        return;
      }
      const body = await readBody(request);
      const credential = String(body.credential || "");
      if (!credential) {
        send(response, 400, { error: "INVALID_INPUT", message: "Falta token de Google." });
        return;
      }
      const verifyResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
      const verified = await verifyResponse.json();
      if (!verifyResponse.ok || verified.aud !== process.env.GOOGLE_CLIENT_ID || !["true", true].includes(verified.email_verified)) {
        send(response, 401, { error: "INVALID_GOOGLE_TOKEN", message: "No pude validar Google." });
        return;
      }
      const email = normalizeEmail(verified.email);
      const name = String(verified.name || email.split("@")[0]).trim();
      let user = db.users.find((item) => item.email === email);
      if (!user) {
        user = {
          id: `google-${verified.sub}`,
          email,
          name,
          passwordHash: `google:${verified.sub}`,
          createdAt: now(),
          updatedAt: now()
        };
        db.users.push(user);
      } else {
        user.name = name;
        user.updatedAt = now();
      }
      const token = createSession(db, user.id);
      await saveDb(db);
      send(response, 200, { user: publicUser(user), token });
      return;
    }

    if (request.method === "GET" && url.pathname === "/me") {
      const user = await requireUser(request, response, db);
      if (!user) return;
      await saveDb(db);
      send(response, 200, { user: publicUser(user) });
      return;
    }

    if (request.method === "GET" && url.pathname === "/sync/album") {
      const user = await requireUser(request, response, db);
      if (!user) return;
      await saveDb(db);
      send(response, 200, db.albums[user.id] || { data: null, updatedAt: null });
      return;
    }

    if (request.method === "PUT" && url.pathname === "/sync/album") {
      const user = await requireUser(request, response, db);
      if (!user) return;
      const body = await readBody(request);
      if (!body.data?.album || !body.data?.stickers || !body.data?.sections) {
        send(response, 400, { error: "INVALID_ALBUM", message: "El payload no parece una coleccion valida." });
        return;
      }
      db.albums[user.id] = {
        data: body.data,
        updatedAt: now(),
        clientSyncId: body.syncId || body.data.profile?.syncId || ""
      };
      user.updatedAt = now();
      await saveDb(db);
      send(response, 200, { ok: true, updatedAt: db.albums[user.id].updatedAt });
      return;
    }

    send(response, 404, { error: "NOT_FOUND", message: "Ruta no encontrada." });
  } catch (error) {
    if (error.message === "BODY_TOO_LARGE") {
      send(response, 413, { error: "BODY_TOO_LARGE", message: "Payload demasiado grande." });
      return;
    }
    send(response, 500, { error: "SERVER_ERROR", message: "Error interno de la API." });
  }
}

createServer(handleRequest).listen(PORT, HOST, () => {
  console.log(`Album Mundialista API escuchando en http://${HOST}:${PORT}`);
});
