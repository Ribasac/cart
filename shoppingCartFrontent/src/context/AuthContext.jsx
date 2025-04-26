import { Children, createContext, useEffect, useState } from "react";
import api from "/src/apiaxios.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    const signup = async (user) => {
        try {
            if (!user.email.trim() || !user.password.trim()) {
                console.log("blank");
                throw new Error("blank");
            }
            const signupResponse = await api.post("/auth/signup", user);

            if (signupResponse.data.token) {
                const token = signupResponse.data.token;
                console.log(token);
                localStorage.setItem("token", token);
                localStorage.setItem("user", true);
                setUser(true);
                return token;
            }
        } catch (e) {
            alert(
                "Error occured : " +
                    (e.response?.data?.message !== undefined
                        ? e.response.data.message
                        : "blank values")
            );
        }

        return null;
    };

    const login = async (email, password) => {
        try {
            if (!email.trim() || !password.trim()) {
                throw new Error("blank");
            }
            const loginResponse = await api.post("/auth/login", {
                email,
                password,
            });

            if (loginResponse.data.token) {
                const token = loginResponse.data.token;
                console.log(token);
                localStorage.setItem("token", token);
                localStorage.setItem("user", true);
                setUser(true);
                return token;
            }
        } catch (e) {
            alert(
                "Error occured : " + e.response?.data?.message != undefined
                    ? e.response?.data?.message
                    : "blank values"
            );
        }

        return null;
    };

    const isUser = () => {
        return localStorage.getItem("user");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(false);
    };

    useEffect(() => {
        console.log("user" + localStorage.getItem("user"));

        setUser(localStorage.getItem("user"));
    }, []);

    return (
        <AuthContext.Provider value={{ isUser, signup, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};
