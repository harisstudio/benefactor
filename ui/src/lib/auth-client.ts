import { createAuthClient } from "better-auth/react"

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8787";
const baseUrl = rawBaseUrl.endsWith("/api") ? rawBaseUrl : `${rawBaseUrl.replace(/\/$/, "")}/api`;

export const authClient = createAuthClient({
    baseURL: baseUrl + "/auth"
})
