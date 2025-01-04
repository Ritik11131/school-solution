import axios, { AxiosError } from 'axios';
import { AuthResponse } from '@/interface/authInterface';
import { environment } from '@/environment/environment.dev';
import toast from 'react-hot-toast';

const AUTH_SERVER_BASE_URL = environment.apiUrl;

class AuthService {
    private apiClient = axios.create({
        baseURL: AUTH_SERVER_BASE_URL,
    });

    private isRefreshing = false;
    private refreshSubscribers: Function[] = [];

    constructor() {
        // Add an interceptor to include the Authorization header from localStorage
        this.apiClient.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor to handle 401 Unauthorized errors
        this.apiClient.interceptors.response.use(
            (response) => response, // Simply return the response if no error
            async (error: AxiosError) => {
                const originalRequest: any = error.config;

                // If the error is 401 and token has expired, try to refresh the token
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    if (this.isRefreshing) {
                        // If a refresh is in progress, add the request to a queue to retry later
                        return new Promise((resolve, reject) => {
                            this.addRefreshSubscriber((token: string) => {
                                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                                resolve(this.apiClient(originalRequest));
                            });
                        });
                    }

                    this.isRefreshing = true;

                    try {
                        // Call refresh token API
                        const response = await this.refreshToken();

                        // Store the new access token and retry the original request
                        this.saveTokens(response);
                        originalRequest.headers['Authorization'] = `Bearer ${response.accessToken}`;

                        // Retry the original request
                        this.onRefreshed(response.accessToken);

                        return this.apiClient(originalRequest);
                    } catch (refreshError) {
                        // If refreshing the token fails, redirect to login or handle accordingly
                        console.error('Token refresh failed:', refreshError);
                        window.location.href = '/login'; // Example redirect to login
                        return Promise.reject(refreshError);
                    }
                }

                // Return the error if it's not a 401 or other scenarios
                return Promise.reject(error);
            }
        );
    }


    private async apiCall<T>(
        promise: Promise<T>,
        messages: { loading: string; success: string; error: string }
    ): Promise<T> {
        return toast.promise(promise, messages);
    }

    private addRefreshSubscriber(subscriber: Function) {
        this.refreshSubscribers.push(subscriber);
    }

    private onRefreshed(newToken: string) {
        // Notify all subscribers with the new token
        this.refreshSubscribers.forEach((callback) => callback(newToken));
        this.refreshSubscribers = [];
    }

    /**
     * Logs in the user by obtaining an access token.
     * @param username - The username or email
     * @param password - The user's password
     * @returns Promise<AuthResponse>
     */
    async login(username: string, password: string): Promise<AuthResponse> {
        const data = new URLSearchParams({
            grantType: "PASSWORD",
            clientId: process.env.CLIENT_ID || environment.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET || environment.CLIENT_SECRET,
            username,
            password,
        });

        const loginPromise = this.apiClient.post<AuthResponse>("/token", data).then((response:any) => {
            this.saveTokens(response?.data?.data);
            return response.data;
        });

            return this.apiCall(loginPromise, {
                loading: "Logging in...",
                success: "Logged in successfully!",
                error: "Login failed. Please check your credentials.",
            });
            }

    /**
     * Refreshes the access token using a refresh token.
     * @returns Promise<AuthResponse>
     */
    async refreshToken(): Promise<AuthResponse> {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token available.');
        }

        const data = new URLSearchParams({
            refresh_token: refreshToken,
        });

        const response = await this.apiClient.post<AuthResponse>('/token/refresh', data);
        this.saveTokens(response.data);
        return response.data;
    }

    /**
     * Save tokens to localStorage.
     * @param tokens - AuthResponse
     */
    private saveTokens(authResponse: AuthResponse) {
        localStorage.setItem('access_token', authResponse.accessToken);
        localStorage.setItem('refresh_token', authResponse.refreshToken);
    }

    /**
     * Clear tokens from localStorage.
     */
    clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('hasVisited');
    }

    /**
  * Checks if the user is authenticated by validating the access token.
  * @returns boolean
  */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token'); // Replace with actual validation logic
    }
}

export default new AuthService();
