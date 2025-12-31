import assert from "node:assert"
import { validUsername, validEmail, validPassword } from "../lib/auth/validation.js"
import { createSession, verify, createCsrfToken, verifyCsrf } from "../lib/auth/session.js"

assert.strictEqual(validUsername("admin_demo"), true)
assert.strictEqual(validUsername("short"), false)
assert.strictEqual(validEmail("admin@demo.com"), true)
assert.strictEqual(validEmail("bad@demo"), false)
assert.strictEqual(validPassword("DemoAdmin@1234"), true)
assert.strictEqual(validPassword("weakpass"), false)

const s = await createSession({ id: "1", username: "admin_demo", email: "admin@demo.com", role: "admin" }, false)
assert.ok(typeof s === "string")
assert.ok(await verify(s))

const csrf = await createCsrfToken()
assert.ok(await verifyCsrf(csrf))

console.log("auth.validation OK")
