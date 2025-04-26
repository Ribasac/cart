import express from "express";
import authRoute from "./Routes/authRoute.js";
import productRoute from "./Routes/productRoute.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 3000;

const uri = "mongodb://localhost:27017/productcart";

mongoose.connect(uri);

const db = mongoose.connection;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);

app.use("/products", productRoute);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
