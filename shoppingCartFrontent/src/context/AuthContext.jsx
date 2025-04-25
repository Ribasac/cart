import { Children, createContext, useEffect, useState } from "react";
import api from "/src/apiaxios.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    const signup = async (user) => {
        const signupResponse = await api.post("/auth/signup", user);

        if (signupResponse.data.token) {
            const token = signupResponse.data.token;
            console.log(token);
            localStorage.setItem("token", token);
            localStorage.setItem("user", true);
            setUser(true);
            return token;
        }

        return null;
    };

    const login = async (email, password) => {
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
