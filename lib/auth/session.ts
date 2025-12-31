const enc = new TextEncoder()

function getSecret() {
  const s = process.env.ADMIN_SESSION_SECRET || "dev-secret"
  return s
}

function toHex(buf: ArrayBuffer) {
  const view = new Uint8Array(buf)
  let out = ""
  for (let i = 0; i < view.length; i++) {
    out += view[i].toString(16).padStart(2, "0")
  }
  return out
}

function b64EncodeUnicode(str: string) {
  // eslint-disable-next-line no-undef
  return btoa(unescape(encodeURIComponent(str)))
}
function b64DecodeUnicode(b64: string) {
  // eslint-disable-next-line no-undef
  return decodeURIComponent(escape(atob(b64)))
}

async function hmac(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload))
  return toHex(sig)
}

export async function sign(data: Record<string, any>) {
  const payload = JSON.stringify(data)
  const sig = await hmac(payload)
  const token = b64EncodeUnicode(payload) + "." + sig
  return token
}

export async function verify(token: string) {
  const parts = token.split(".")
  if (parts.length !== 2) return null
  const payloadB64 = parts[0]
  const sig = parts[1]
  const payloadStr = b64DecodeUnicode(payloadB64)
  const expected = await hmac(payloadStr)
  if (expected !== sig) return null
  try {
    const data = JSON.parse(payloadStr)
    if (typeof data.exp === "number" && Date.now() > data.exp) return null
    return data
  } catch {
    return null
  }
}

export async function createSession(user: { id: string; username: string; email: string; role: string }, remember: boolean) {
  const ttl = remember ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 8
  const exp = Date.now() + ttl
  return await sign({ sub: user.id, username: user.username, email: user.email, role: user.role, exp })
}

export async function createCsrfToken() {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  const nonce = Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("")
  const exp = Date.now() + 1000 * 60 * 30
  return await sign({ t: nonce, exp })
}

export async function verifyCsrf(token: string | null | undefined) {
  if (!token) return false
  const v = await verify(token)
  return !!v
}

