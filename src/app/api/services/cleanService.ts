import { safeUrl } from "@/helpers/siteData";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Whitelist and clean service fields coming from the admin form
export const cleanService = (body: any) => {
  const image = str(body?.image, 500);
  return {
    title: str(body?.title, 100),
    description: str(body?.description, 600),
    // Uploaded (https) image or an image inside /public
    image: image.startsWith("/") && !image.startsWith("//") ? image : safeUrl(image),
    category: ["bag", "cloth", "other"].includes(body?.category) ? body.category : "cloth",
    order: Number.isFinite(Number(body?.order)) ? Number(body.order) : 0,
    isActive: body?.isActive !== false,
  };
};
