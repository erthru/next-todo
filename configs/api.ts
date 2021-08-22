import axios, { AxiosInstance } from "axios";
import * as session from "../helpers/session";

const api = (): AxiosInstance => {
    const instance = axios.create({
        timeout: 5000,
        headers: {
            Authorization: `Bearer ${session.get().token}`,
        },
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                instance
                    .post(
                        "/api/auths/authenticate/refresh",
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${session.get().refreshToken}`,
                            },
                        }
                    )
                    .then((res) => {
                        session.create(res.data.token, res.data.refreshToken);
                    })
                    .catch((e) => {
                        session.clear();
                        window.location.href = "/login";
                    });
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export default api;
