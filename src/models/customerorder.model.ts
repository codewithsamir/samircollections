import mongoose, { Schema } from "mongoose";

const EachclothSchema = new Schema({
  clothname: {
    type: String,
    required: [true, "cloth name is requred"],
  },
  cloth_qty: {
    type: Number,
    required: [true, "cloth quantity is required"],
  },
  clothrepair_price: {
    type: Number,
    required: [true, "cloth repair price is required"],
  },
});

const CustomerOderSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "CustomerUser",
  },
  cloth_quantity: {
    type: Number,
    default: 0,
    required: [true, "cloth quantity required"],
  },
  cloth_detail: [EachclothSchema],
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
    enum: ["pending", "delivered"],
    default: "pending",
    required: [true, "status required"],
  },
});



// Middleware to calculate total price before saving
CustomerOderSchema.pre("save", function (next) {
    if (this.cloth_detail && this.cloth_detail.length > 0) {
      const totalWithoutDiscount = this.cloth_detail.reduce(
        (sum, item) => sum + item.cloth_qty * item.clothrepair_price,
        0
      );
      const discountAmount = (totalWithoutDiscount * (this.discount || 0)) / 100;
      this.total_price = totalWithoutDiscount - discountAmount;
    }
    next();
  });

const Customerorder =
  mongoose.models.Customerorder ||
  mongoose.model("Customerorder", CustomerOderSchema);

export default Customerorder;
