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

// `api`-ke direct function (req) ebong object duivabei kaj korar jonno Object.assign use kora holo
export const api = Object.assign(req, {
    get: <T>(path: string) => req<T>(path),
    post: <T>(path: string, body: any) => req<T>(path, { method: "POST", body: JSON.stringify(body) }),
    patch: <T>(path: string, body?: any) => req<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
    delete: <T>(path: string) => req<T>(path, { method: "DELETE" }),
});

export const adminApi = {
    users: () => req<AdminUser[]>("/admin/users"),
    updateRole: (id: string, role: Role) => req(`/admin/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) }),
    blockUser: (id: string) => req(`/admin/users/${id}/block`, { method: "PATCH" }),
    bloodRequests: () => req<BloodRequest[]>("/admin/blood-requests"),
    updateRequestStatus: (id: string, status: "VERIFIED" | "REJECTED") =>
        req(`/admin/blood-requests/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
    reports: () => req<Report>("/admin/reports"),
    auditLogs: () => req<AuditLog[]>("/admin/audit-logs"),
};