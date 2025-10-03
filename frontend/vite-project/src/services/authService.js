import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // backend adresin
  withCredentials: true, // cookie veya session gerekiyorsa ekle
});

// Register
export const register = async (userData) => {
    return api.post("/auth/register", userData);
};

// Login
export const login = async (userData) => {
    return api.post("/auth/login", userData);
};

// Refresh Token
export const refreshToken = async (refreshToken) => {
    return api.post("/auth/refresh", { refreshToken });
};

// Axios Interceptor: Token yenileme
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshTokenValue = localStorage.getItem("refreshToken");
                const res = await api.post("/auth/refresh", { refreshToken: refreshTokenValue });
                localStorage.setItem("authToken", res.data.token);

                originalRequest.headers["Authorization"] = `Bearer ${res.data.token}`;
                return api(originalRequest);
            } catch (err) {
                console.error("Token yenileme başarısız:", err);
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
