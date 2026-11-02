import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import Service from "@/models/service.model";
import { requireAdmin } from "@/helpers/auth";
import { cleanService } from "../cleanService";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const data = cleanService(await request.json());
    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const service = await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, message: "Service updated", service });
  } catch (error: any) {
    console.error("Update service error:", error.message);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    await Service.findByIdAndDelete(id);
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (error: any) {
    console.error("Delete service error:", error.message);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
