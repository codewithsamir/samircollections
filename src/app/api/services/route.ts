import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Service from "@/models/service.model";
import { requireAdmin } from "@/helpers/auth";
import { DEFAULT_SERVICES } from "@/helpers/siteData";
import { cleanService } from "./cleanService";

// Admin list: all services including hidden ones
export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) return auth;

    const services = await Service.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ services });
  } catch (error: any) {
    console.error("Get services error:", error.message);
    return NextResponse.json({ error: "Failed to load services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) return auth;
    await connectToDatabase();

    const body = await request.json();

    // One-click import of the website's built-in services
    if (body?.importDefaults === true) {
      if ((await Service.countDocuments()) > 0) {
        return NextResponse.json({ error: "Services already exist" }, { status: 400 });
      }
      await Service.insertMany(DEFAULT_SERVICES);
      revalidatePath("/", "layout");
      return NextResponse.json({ success: true, message: "Default services imported" });
    }

    const data = cleanService(body);
    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const service = await Service.create(data);
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, message: "Service added", service });
  } catch (error: any) {
    console.error("Create service error:", error.message);
    return NextResponse.json({ error: "Failed to add service" }, { status: 500 });
  }
}
