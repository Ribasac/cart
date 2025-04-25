import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Cart from "../components/Cart";
import { AuthContext } from "../context/AuthContext";

function Products() {
    const { products, cart, addToCart, removeFromCart } =
        useContext(ProductContext);

    const { logout } = useContext(AuthContext);

    const [viewer, setViewer] = useState(false);

    useEffect(() => {
        console.log(products);
    }, [products]);

    const handleCart = (item) => {
        if (cart.some((i) => i.productId == item.productId)) {
            removeFromCart(item);
        } else {
            addToCart(item);
        }
    };

    const handleViewer = () => {
        setViewer(!viewer);
    };

    return (
        <div className="products">
            <div className="cartViewer" onClick={handleViewer}>
                {viewer ? "Close Cart" : "View Cart"}
            </div>
            <div className="logoutButton" onClick={logout}>
                Logout
            </div>
            {products.map((item) => (
                <div className="productCard">
                    <h2>{item.name}</h2>
                    <h3>{item.price}</h3>
                    <div
                        className="cartButton"
                        onClick={() => {
                            handleCart(item);
                        }}
                    >
                        {cart.some((i) => i.productId == item.productId)
                            ? "Remove from Cart"
                            : "Add to Cart"}
                    </div>
                </div>
            ))}

            {viewer && <Cart></Cart>}
        </div>
    );
}

export default Products;
