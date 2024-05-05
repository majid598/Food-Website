import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/utility.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["Food-token"];

  if (!token) return next(new ErrorHandler("Please Login first", 404));

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodeData._id;

  next();
};
