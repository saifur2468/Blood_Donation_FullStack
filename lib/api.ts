const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

async function req<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const res = await fetch(`${BASE}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...init.headers,
        },
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "Request failed");
    return json.data as T;
}

export type Role = "ADMIN" | "DONOR" | "PATIENT";
export type AdminUser = { id: string; fullName: string; email: string; role: Role; isBlocked?: boolean; createdAt: string };
export type BloodRequest = { id: string; bloodGroup: string; bagsNeeded: number; hospitalName: string; city: string; urgency: string; status: string; neededBy: string };
export type Report = { totalUsers: number; totalDonors: number; totalPatients: number; totalBloodRequests: number; pendingRequests: number; approvedRequests: number };
export type AuditLog = { id: string; action: string; details: string; createdAt: string; user: { fullName: string; email: string } };

export const adminApi = {
    users: () => req<AdminUser[]>("/admin/users"),
    updateRole: (id: string, role: Role) => req(`/admin/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) }),
    blockUser: (id: string) => req(`/admin/users/${id}/block`, { method: "PATCH" }),
    bloodRequests: () => req<BloodRequest[]>("/admin/blood-requests"), // backend-e list endpoint lagbe
    updateRequestStatus: (id: string, status: "VERIFIED" | "REJECTED") =>
        req(`/admin/blood-requests/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
    reports: () => req<Report>("/admin/reports"),
    auditLogs: () => req<AuditLog[]>("/admin/audit-logs"),
};