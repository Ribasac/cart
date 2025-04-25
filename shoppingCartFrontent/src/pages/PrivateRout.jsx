import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PrivateRout({ children }) {
    const { isUser } = useContext(AuthContext);
    return isUser() ? children : <Navigate to="/login" replace={true} />;
}

export default PrivateRout;
