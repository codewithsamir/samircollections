import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Product from "@/models/product.model";
import { requireAdmin } from "@/helpers/auth";

type RouteContext = { params: Promise<{ id: string }> };

const ALLOWED_FIELDS = ["name", "description", "price", "category", "images", "stock", "isFeatured"];

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await connectToDatabase();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error: any) {
    console.error("Get product error:", error.message);
    return NextResponse.json({ error: "Failed to load product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Only update known product fields
    const reqBody = await request.json();
    const update = Object.fromEntries(Object.entries(reqBody).filter(([key]) => ALLOWED_FIELDS.includes(key)));

    const updatedProduct = await Product.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json({
      message: "Product updated successfully",
      success: true,
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error("Update product error:", error.message);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await Product.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Delete product error:", error.message);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
