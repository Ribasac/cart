import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function Cart() {
    const { cart, cartTotal } = useContext(ProductContext);

    return (
        <div className="cart">
            <div className="cartList">
                {cart.map((item) => (
                    <div className="cartItem">
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                    </div>
                ))}
            </div>
            <h2 className="cartPrice">{cartTotal}</h2>
        </div>
    );
}

export default Cart;
