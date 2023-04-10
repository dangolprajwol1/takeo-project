import mongoose from "mongoose";

export const connectDb = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL as string);
  if (connection) {
    console.log("Connected to DB");
  } else {
    console.log("Error connecting to DB");
  }
};
