import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(`connection successfull to DB`);
  } catch (error) {
    console.log(`CanNot Connect to DB`);
  }
};
