export interface LoginResponse {
    token: string;
    role: string;
    user: string;
    mustChangePassword: boolean;
}