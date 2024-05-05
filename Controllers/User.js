import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { User } from "../models/user.js";
import { compare } from "bcrypt";

const newUser = TryCatch(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const emilExist = await User.findOne({ email });
  if (emilExist) return next(new ErrorHandler("Email already Exist", 404));
  if (!name || !username || !email || !password)
    return next(new ErrorHandler("All fields are required", 404));

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  sendToken(res, user, 200, `welcome ${user.name}`);
});

const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email, password);

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Email Or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Invalid Email Or Password", 404));

  sendToken(res, user, 200, `Welcome Back ${user.name}`);
});

const logout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("Food-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

const myProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);
  return res.status(200).json({
    success: true,
    user,
  });
});

const allUsers = TryCatch(async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json({
    success: true,
    users,
  });
});

export { newUser, login, logout, myProfile, allUsers };
