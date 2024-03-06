import app from "./app.js";
import { connectDB } from "./config/Db.js";
import Razorpay from "razorpay";
const PORT = process.env.PORT;
connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("<h1>Server Is Working</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Is runnig at Port Number ${PORT} in ${process.env.NODE_ENV} MODE`);
});
