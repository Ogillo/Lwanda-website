export type AdminLog = {
  action: string
  entityType: string
  entityId?: string
  metadata?: Record<string, any>
}

export const logAdminAction = async (log: AdminLog) => {
  try {
    await fetch("/api/admin/log", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(log) })
  } catch {}
}
