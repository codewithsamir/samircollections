import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  name: {
    type: String,
    required: [true, "item name is required"],
  },
  detail: {
    type: String,
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
    default: 1,
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
});

const CustomerOderSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "CustomerUser",
  },
  total_quantity: {
    type: Number,
    default: 0,
    required: [true, "total quantity is required"],
  },
  items: [OrderItemSchema],
  pickup_date: {
    type: Date,
  },
  delivery_date: {
    type: Date,
  },
  discount: {
    type: Number,
  },
  total_price: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["pending", 
      "processing", "delivered"],
    default: "pending",
    required: [true, "status required"],
  },
},{timestamps:true});

// Middleware to calculate total price and total quantity before saving
CustomerOderSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    // Calculate total price
    const totalWithoutDiscount = this.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const discountAmount = (totalWithoutDiscount * (this.discount || 0)) / 100;
    this.total_price = totalWithoutDiscount - discountAmount;

    // Calculate total quantity
    this.total_quantity = this.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }

  next();
});

const Customerorder =
  mongoose.models.Customerorder || mongoose.model("Customerorder", CustomerOderSchema);

export default Customerorder;
