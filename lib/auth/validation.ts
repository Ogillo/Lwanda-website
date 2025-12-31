export function validUsername(v: string) {
  return typeof v === "string" && v.length >= 8 && /^[a-zA-Z0-9_\-]+$/.test(v)
}
export function validEmail(v: string) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}
export function validPassword(v: string) {
  return typeof v === "string" && v.length >= 12 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /[0-9]/.test(v) && /[^A-Za-z0-9]/.test(v)
}

