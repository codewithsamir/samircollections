import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import SiteSettings from "@/models/sitesettings.model";
import { requireAdmin } from "@/helpers/auth";
import { getSiteSettings, sanitizeSettings } from "@/helpers/siteData";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) return auth;

    const body = await request.json();
    const settings = sanitizeSettings(body);

    await SiteSettings.findOneAndUpdate({ key: "main" }, { $set: settings }, { upsert: true, new: true });

    // Refresh every public page so the new content shows immediately
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, message: "Website settings saved", settings: await getSiteSettings() });
  } catch (error: any) {
    console.error("Save settings error:", error.message);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
