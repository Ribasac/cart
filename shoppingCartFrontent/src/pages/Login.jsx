import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = async () => {
        console.log("email", email);
        console.log("password", password);
        await login(email, password);
        navigate("/", { replace: true });
    };

    const { isUser } = useContext(AuthContext);

    if (isUser()) {
        return <Navigate to="/" replace={true}></Navigate>;
    }

    return (
        <div>
            <div className="loginCard">
                <h1 className="loginTitle">Login</h1>
                <input
                    type="text"
                    placeholder="Email"
                    className="loginInput"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="loginInput"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="loginButton" onClick={onSubmit}>
                    Login
                </button>
            </div>
            <a href="/signup">dont have an account?</a>
        </div>
    );
}

export default Login;
