import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const products = [
    { productId: 1, name: "Wireless Mouse", price: 25.99 },
    { productId: 2, name: "Bluetooth Keyboard", price: 45.5 },
    { productId: 3, name: "USB-C Charger", price: 19.99 },
    { productId: 4, name: "Laptop Stand", price: 29.95 },
    { productId: 5, name: "Webcam 1080p", price: 39.99 },
];

const authenticate = (req, res, next) => {
    console.log("authenticate middleware called");

    const token = req.headers["token"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        req.user = jwt.verify(token, "cjbfwejfbwhbfwehfui");
        next();
    } catch (error) {
        res.status(403).json({ message: "Forbidden" });
    }
};

router.get("/", authenticate, (req, res) => {
    res.json(products);
});

export default router;
