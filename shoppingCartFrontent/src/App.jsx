import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Products from "./pages/Products";
import PrivateRout from "./pages/PrivateRout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
    const [count, setCount] = useState(0);

    return (
        <AuthProvider>
            <ProductProvider>
                <Routes>
                    {/* public route */}
                    <Route path="/login" element={<Login></Login>} />
                    <Route path="/signup" element={<Signup></Signup>} />
                    {/* private route */}
                    <Route
                        path="/"
                        element={
                            <PrivateRout>
                                <Products></Products>
                            </PrivateRout>
                        }
                    />
                </Routes>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
