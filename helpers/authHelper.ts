import {APIRequestContext} from "@playwright/test";
import {AuthResponse} from "./types";

/**
 * Выполняет вход пользователя через API
 * @param request - API контекст
 * @param creds - учетные данные { email, password }
 * @returns Promise с токеном и данными пользователя
 * 
 * @example
 * const auth = await login(api, { 
 *   email: "user@example.com", 
 *   password: "password123" 
 * });
 */
export async function login(request: APIRequestContext, creds: { email: string; password: string }): Promise<AuthResponse> {
    const res = await request.post("/api/v1/auth/login", { data: creds });

    if (!res.ok()) {
        throw new Error(`Login failed: ${res.status()}\n${await res.text()}`);
    }
    return (await res.json()) as AuthResponse;
}
