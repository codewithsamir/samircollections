import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a service title"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide a service description"],
      maxlength: 600,
    },
    image: {
      type: String, // Cloudinary URL or /public path
    },
    category: {
      type: String,
      enum: ["bag", "cloth", "other"],
      default: "cloth",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
export default Service;
