import { createContext, useContext, useEffect, useState } from "react";
import api from "/src/apiaxios.js";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [first, setFirst] = useState(true);

    const { isUser, user } = useContext(AuthContext);

    const fetchProducts = async () => {
        if (isUser()) {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/products", {
                    headers: {
                        token: token,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
    };

    const addToCart = (item) => {
        setCart((p) => [...p, item]);
    };

    const removeFromCart = (item) => {
        setCart((p) => p.filter((i) => i.productId != item.productId));
    };

    useEffect(() => {
        fetchProducts();
    }, [user]);

    useEffect(() => {
        console.log(cart);
        let total = 0;
        cart.forEach((element) => {
            total = parseFloat((total + Number(element.price)).toFixed(2));
        });
        setCartTotal(total);

        if (!first) {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            setFirst(false);
        }
    }, [cart]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")));
    }, []);

    return (
        <ProductContext.Provider
            value={{ products, cart, addToCart, removeFromCart, cartTotal }}
        >
            {children}
        </ProductContext.Provider>
    );
};
