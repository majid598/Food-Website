import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import ErrorHandler from "../utils/utility.js";

const placeOrder = TryCatch(async (req, res, next) => {
  const {
    items,
    subtotal,
    shippingCharges,
    tax,
    totalAmount,
    shippingInfo,
    paymentMethod,
    paymentRef,
  } = req.body;
  const user = req.user;

  const order = await Order.create({
    user,
    items,
    subtotal,
    shippingCharges,
    tax,
    totalAmount,
    shippingInfo,
    paymentMethod,
    paymentRef,
  });

  return res.status(200).json({
    success: true,
    message: "Order placed successfully",
  });
});

const allOrders = TryCatch(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name");
  return res.status(200).json({
    success: true,
    orders,
  });
});
const myOrders = TryCatch(async (req, res, next) => {
  const orders = await Order.find({ user: req.user });
  return res.status(200).json({
    success: true,
    orders,
  });
});

const singleOrder = TryCatch(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name");
  return res.status(200).json({
    success: true,
    order,
  });
});

const stats = TryCatch(async (req, res, next) => {
  const orders = await Order.find();
  let totalIncome = 0;
  orders.forEach((order) => {
    totalIncome += order.totalAmount;
  });

  const preparingOrders = await Order.find({ status: "Preparing" });
  const shippedOrders = await Order.find({ status: "Shipped" });
  const deliveredOrders = await Order.find({ status: "Delivered" });

  return res.status(200).json({
    success: true,
    totalIncome,
    preparingOrders: preparingOrders.length,
    shippedOrders: shippedOrders.length,
    deliveredOrders: deliveredOrders.length,
  });
});

const statusUpdate = TryCatch(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.status === "Delivered")
    return next(new ErrorHandler("Order Already Delivered"));

  if (order.status === "Canceled")
    return next(new ErrorHandler("Order Canceled"));

  switch (order.status) {
    case "Preparing":
      order.status = "Shipped";
      break;
    case "Shipped":
      order.status = "Delivered";
      order.deliveredAt = Date.now().toString();
      break;
    default:
      order.status = "Delivered";
      break;
  }

  await order.save();

  return res.status(200).json({
    success: true,
    message: `Order ${
      order.status === "Shipped"
        ? "Shipped Successfully"
        : order.status === "Delivered"
        ? "Delivered successfully"
        : "already Delivered"
    }`,
  });
});

export { placeOrder, allOrders, myOrders, singleOrder, stats, statusUpdate };
