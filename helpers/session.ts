import Cookies from "js-cookie";

export type SessionValue = {
    token: string;
    refreshToken: string;
};

export const get = (): SessionValue => {
    return {
        token: Cookies.get("token") ?? "",
        refreshToken: localStorage.getItem("refreshToken") ?? "",
    };
};

export const create = (token: string, refreshToken: string) => {
    Cookies.set("token", token, { expires: 7 });
    localStorage.setItem("refreshToken", refreshToken);
};

export const hasSession = (): boolean => Cookies.get("token") !== undefined && localStorage.getItem("refreshToken") !== null;

export const clear = () => {
    Cookies.remove("token");
    localStorage.removeItem("refreshToken");
};
