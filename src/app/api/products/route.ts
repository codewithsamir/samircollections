import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Product from "@/models/product.model";
import { requireAdmin } from "@/helpers/auth";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ products });
  } catch (error: any) {
    console.error("Get products error:", error.message);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) return auth;

    const reqBody = await request.json();
    const { name, description, price, category, images, stock, isFeatured } = reqBody;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images,
      stock,
      isFeatured,
    });

    const savedProduct = await newProduct.save();
    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      product: savedProduct,
    });
  } catch (error: any) {
    console.error("Create product error:", error.message);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
