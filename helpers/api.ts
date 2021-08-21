import axios, { AxiosInstance } from "axios";
import { API_URL } from "./environments";
import * as session from "./session";

const api = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: API_URL,
        timeout: 5000,
        headers: {
            Authorization: `Bearer ${session.get().token}`,
        },
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            const originalRequest = error.config;

            if (
                error.response.status === 401 &&
                originalRequest.url !== `${API_URL}auths/authenticate/refresh` &&
                originalRequest.url !== `${API_URL}auths/authenticate`
            ) {
                instance
                    .post(
                        `${API_URL}auths/authenticate/refresh`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${session.get().refreshToken}`,
                            },
                        }
                    )
                    .then((res) => {
                        session.create(res.data.token, res.data.refreshToken);
                    });
            } else if (error.response.status === 401 && originalRequest.url === `${API_URL}auths/authenticate/refresh`) {
                session.clear();
                window.location.href = "/login";
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export default api;
