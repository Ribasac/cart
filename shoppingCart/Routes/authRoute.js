import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const users = [];

router.post("/signup", async (req, res) => {
    const user = req.body;
    console.log(user);
    try {
        console.log("here");
        users.push(user);
        console.log("here2");
        const token = jwt.sign(user.email, "cjbfwejfbwhbfwehfui");
        console.log(token);
        res.status(201).json({
            message: "User created successfully",
            token: token,
        });

        // res.json({ token: token });
    } catch (error) {
        res.status(400).json({ error: "Error creating user" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        console.log(users);

        const user = users.find((user) => user.email == email);
        console.log(user);
        if (!user || user.password != password) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(user.email, "cjbfwejfbwhbfwehfui");
        res.json({ token: token });
    } catch {}
});

export default router;
