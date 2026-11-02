import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utility/cloudinary";
import { requireAdmin } from "@/helpers/auth";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) return auth;

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, WEBP, GIF or AVIF images are allowed" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Image must be smaller than 5 MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await uploadImage(fileBase64);

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
