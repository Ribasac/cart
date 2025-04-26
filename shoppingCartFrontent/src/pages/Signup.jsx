import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signup, isUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = async () => {
        console.log("email", email);
        console.log("password", password);
        await signup({ email: email, password: password });
        navigate("/", { replace: true });
    };

    if (isUser()) {
        return <Navigate to="/" replace={true}></Navigate>;
    }

    return (
        <div>
            <div className="loginCard">
                <h1 className="loginTitle">Signup</h1>
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
                    Signup
                </button>
            </div>
        </div>
    );
}

export default Signup;
