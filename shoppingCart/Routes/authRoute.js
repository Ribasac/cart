import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const router = express.Router();

const users = [];

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: String,
});

const User = mongoose.model("User", userSchema);

router.post("/signup", async (req, res) => {
    const userData = req.body;
    const email = userData.email;
    console.log(userData);

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = new User(userData);
        await user.save();
        // console.log("here");
        // users.push(user);
        // console.log("here2");
        const token = jwt.sign({ id: user._id }, "cjbfwejfbwhbfwehfui");
        res.status(201).json({
            message: "User created successfully",
            token: token,
        });

        // res.json({ token: token });
    } catch (error) {
        console.log(error);

        res.status(400).json({ error: "Error creating user" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, "cjbfwejfbwhbfwehfui");
        res.json({ token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error logging in" });
    }
});

export default router;
