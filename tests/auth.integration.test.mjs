import assert from "node:assert"
import { POST as csrfGET } from "../app/api/auth/csrf/route.ts"
import { POST as loginPOST } from "../app/api/auth/login/route.ts"
import { POST as signupPOST } from "../app/api/auth/signup/route.ts"

const csrfRes = await csrfGET()
const csrfJson = await csrfRes.json()
assert.ok(csrfJson.token)

const demoSignupReq = new Request("http://localhost/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json", "x-csrf-token": csrfJson.token }, body: JSON.stringify({ username: "admin_demo", email: "admin@demo.com", password: "DemoAdmin@1234", confirm: "DemoAdmin@1234" }) })
const demoSignupRes = await signupPOST(demoSignupReq)
assert.strictEqual(demoSignupRes.status, 200)

const demoLoginReq = new Request("http://localhost/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json", "x-csrf-token": csrfJson.token }, body: JSON.stringify({ identifier: "admin_demo", password: "DemoAdmin@1234", remember: true }) })
const demoLoginRes = await loginPOST(demoLoginReq)
assert.strictEqual(demoLoginRes.status, 200)

const badLoginReq = new Request("http://localhost/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json", "x-csrf-token": csrfJson.token }, body: JSON.stringify({ identifier: "admin_demo", password: "wrong" }) })
const badLoginRes = await loginPOST(badLoginReq)
assert.strictEqual(badLoginRes.status, 401)

console.log("auth.integration OK")

