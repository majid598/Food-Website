import mongoose, { model } from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        itemNum: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        img: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    shippingCharges: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Preparing", "Shipped", "Delivered"],
      default: "Preparing",
    },
    paymentMethod: {
      type: String,
      enum: ["C.O.D", "Online"],
      required: true,
    },
    paymentRef: {
      type: String,
      required: true,
    },
    shippingInfo: {
      houseNumber: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
    },
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.models.Order || model("Order", schema);
