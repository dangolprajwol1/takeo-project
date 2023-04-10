import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/dbConnect";
import router from "./routes/userRoute";

const app: Application = express();

app.use(express.json());

app.use(cors());

dotenv.config();

connectDb();
app.use("/api/v1", router);
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server running ${port}`);
});
