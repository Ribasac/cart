import express from "express";
import authRoute from "./Routes/authRoute.js";
import productRoute from "./Routes/productRoute.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);

app.use("/products", productRoute);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
