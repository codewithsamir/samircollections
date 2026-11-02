import { connectToDatabase } from "@/dbConfig/dbConfig";
import SiteSettings from "@/models/sitesettings.model";
import Service from "@/models/service.model";
import { services as defaultServiceData } from "@/utility/servicedata";

export type SocialKey = "facebook" | "instagram" | "tiktok" | "youtube" | "twitter";

export interface SiteSettingsData {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  openingHours: string;
  mapEmbedUrl: string;
  socials: Record<SocialKey, string>;
  hero: { badge: string; title: string; highlight: string; titleEnd: string; subtitle: string; nepaliLine: string };
  faqs: { q: string; a: string }[];
  priceList: { group: string; rows: { item: string; price: string }[] }[];
}

export interface ServiceData {
  _id?: string;
  title: string;
  description: string;
  image: string;
  category: "bag" | "cloth" | "other";
  order: number;
  isActive: boolean;
}

export const SOCIAL_KEYS: SocialKey[] = ["facebook", "instagram", "tiktok", "youtube", "twitter"];

// Used until the admin saves their own content (and whenever the database is unreachable)
export const DEFAULT_SETTINGS: SiteSettingsData = {
  businessName: "Samir Collection",
  tagline: "Bag & Cloth Repairing Centre",
  phone: "+977 9824823877",
  whatsapp: "9779824823877",
  email: "",
  address: "Pidari Chowk, Janakpur, Nepal",
  openingHours: "",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.051999461477!2d85.92020837488913!3d26.742716667376317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec6b03e229d79d%3A0x6a17ae8dc201a117!2sSamir%20Bag%20And%20Jeans%20Repairing%20Centre!5e0!3m2!1sen!2snp!4v1731868309211!5m2!1sen!2snp",
  socials: { facebook: "", instagram: "", tiktok: "", youtube: "", twitter: "" },
  hero: {
    badge: "Bag & Cloth Repairing Centre · Janakpur",
    title: "Give your favourite",
    highlight: "bags & clothes",
    titleEnd: "a second life",
    subtitle:
      "Broken zipper, torn strap or jeans that don't fit? Our expert tailors repair, alter and restore it — neatly, quickly and at a fair price.",
    nepaliLine: "पुरानो झोला र कपडा, फेरि नयाँ जस्तै!",
  },
  faqs: [
    {
      q: "How long does a repair take?",
      a: "Small jobs like zipper or button changes are usually ready the same day. Bigger repairs and alterations take 1–3 days. We always tell you the time before we start.",
    },
    {
      q: "Do you offer home pickup?",
      a: "Yes. We offer pickup and delivery within Janakpur city. A small service charge may apply for locations outside Janakpur.",
    },
    {
      q: "How much will my repair cost?",
      a: "It depends on the item and the work needed. Check our price list or send a photo on WhatsApp for a quick quote.",
    },
    {
      q: "Can you repair branded or expensive bags?",
      a: "Yes. We handle every item carefully and use matching, good-quality materials so the repair blends in.",
    },
  ],
  priceList: [
    {
      group: "Jacket Services",
      rows: [
        { item: "Runner Change", price: "Rs. 40 to Rs. 50" },
        { item: "Whole Zipper Change", price: "Depends on Size" },
        { item: "Fitting", price: "Depends on Size and Fit" },
        { item: "Sticker Stitching", price: "Depends on Effort and Sticker price" },
      ],
    },
    {
      group: "Jeans Services",
      rows: [
        { item: "Whole Fitting", price: "Rs. 300" },
        { item: "Side Fitting", price: "Rs. 100" },
        { item: "Height Fitting (Shortening)", price: "Rs. 50 to Rs. 100 (Depends on Style)" },
        { item: "Kamar (Waist) Fitting", price: "Rs. 100 to Rs. 150" },
        { item: "Zipper Change", price: "Rs. 100" },
        { item: "Runner Change", price: "Rs. 50" },
        { item: "Scratch or Cut Repairs", price: "Depends on Effort and Area" },
        { item: "Tear Repairs", price: "Depends on Size and Complexity" },
        { item: "Pocket Change", price: "Rs. 50 to Rs. 100 (Depends on Style)" },
      ],
    },
    {
      group: "Pants & Track Pants",
      rows: [
        { item: "Pant Zipper or Chain Change", price: "Rs. 80" },
        { item: "Only Runner Change", price: "Rs. 50" },
        { item: "Elastic Change (1-inch)", price: "Rs. 100" },
        { item: "Elastic Change (2-inch)", price: "Rs. 150" },
        { item: "Track Pant Elastic Change (1-inch)", price: "Rs. 100" },
        { item: "Track Pant Elastic Change (2-inch)", price: "Rs. 150" },
      ],
    },
    {
      group: "Bag Services",
      rows: [
        { item: "Bag Zipper Change", price: "Rs. 40 to Rs. 100" },
        { item: "Whole Zipper Change", price: "Depends on Size" },
        { item: "School Bag Runner Change", price: "Rs. 40 to Rs. 60" },
        { item: "Ladies / Hand Bag Runner Change", price: "Rs. 50 to Rs. 80" },
        { item: "Office / Laptop Bag Runner Change", price: "Rs. 60 to Rs. 100" },
        { item: "Travel / Duffel Bag Runner Change", price: "Rs. 80 to Rs. 150" },
        { item: "Trolley Bag Runner Change", price: "Rs. 100 to Rs. 250 (Depends on Size)" },
        { item: "Ladies Bag Repairs", price: "Depends on Size and Quality" },
      ],
    },
  ],
};

const BAG_SERVICES = ["Bag Repairing Services", "Ladies Bag Repair", "Trolley Bag Services", "Zipper Repairs"];

export const DEFAULT_SERVICES: ServiceData[] = defaultServiceData.map((s, i) => ({
  title: s.title,
  description: s.description,
  image: s.imageSrc,
  category: BAG_SERVICES.includes(s.title) ? "bag" : s.title === "Belt Services" ? "other" : "cloth",
  order: i,
  isActive: true,
}));

// Don't let a slow/unreachable database hang the public pages
const withTimeout = <T,>(promise: Promise<T>, ms = 4000) =>
  Promise.race([promise, new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))]);

const toPlain = <T,>(doc: unknown): T => JSON.parse(JSON.stringify(doc));

export const getSiteSettings = async (): Promise<SiteSettingsData> => {
  try {
    const doc = await withTimeout(
      connectToDatabase().then(() => SiteSettings.findOne({ key: "main" }).lean())
    );
    if (!doc) return DEFAULT_SETTINGS;
    const saved = toPlain<Partial<SiteSettingsData>>(doc);
    return {
      ...DEFAULT_SETTINGS,
      ...Object.fromEntries(Object.entries(saved).filter(([, v]) => v !== "" && v != null)),
      socials: { ...DEFAULT_SETTINGS.socials, ...saved.socials },
      hero: { ...DEFAULT_SETTINGS.hero, ...Object.fromEntries(Object.entries(saved.hero || {}).filter(([, v]) => v)) },
      faqs: saved.faqs?.length ? saved.faqs : DEFAULT_SETTINGS.faqs,
      priceList: saved.priceList?.length ? saved.priceList : DEFAULT_SETTINGS.priceList,
    } as SiteSettingsData;
  } catch (error) {
    console.error("Could not load site settings, using defaults:", (error as Error).message);
    return DEFAULT_SETTINGS;
  }
};

export const getServices = async (): Promise<ServiceData[]> => {
  try {
    const docs = await withTimeout(
      connectToDatabase().then(() => Service.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).lean())
    );
    return docs.length ? toPlain<ServiceData[]>(docs) : DEFAULT_SERVICES;
  } catch (error) {
    console.error("Could not load services, using defaults:", (error as Error).message);
    return DEFAULT_SERVICES;
  }
};

export interface FeaturedProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
}

// Featured products first, then newest; empty list if none are added yet
export const getFeaturedProducts = async (limit = 4): Promise<FeaturedProduct[]> => {
  try {
    const Product = (await import("@/models/product.model")).default;
    const docs = await withTimeout(
      connectToDatabase().then(() => Product.find({}).sort({ isFeatured: -1, createdAt: -1 }).limit(limit).lean())
    );
    return toPlain<FeaturedProduct[]>(docs);
  } catch (error) {
    console.error("Could not load products:", (error as Error).message);
    return [];
  }
};

// ---- Input cleaning for the admin settings form ----

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Only allow real http(s) links, so `javascript:` URLs can't be injected into the site
export const safeUrl = (v: unknown) => {
  const value = str(v, 500);
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "";
  } catch {
    return "";
  }
};

// Accepts either the Google Maps embed URL or the whole <iframe> snippet copied from Google Maps
export const safeMapUrl = (v: unknown) => {
  const raw = str(v, 2000);
  const src = raw.match(/src=["']([^"']+)["']/)?.[1] ?? raw;
  const url = safeUrl(src.replace(/&amp;/g, "&"));
  return /^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/.test(url) ? url : "";
};

export const sanitizeSettings = (body: any): SiteSettingsData => ({
  businessName: str(body?.businessName, 80),
  tagline: str(body?.tagline, 120),
  phone: str(body?.phone, 30),
  whatsapp: str(body?.whatsapp, 20).replace(/\D/g, ""),
  email: str(body?.email, 120),
  address: str(body?.address, 200),
  openingHours: str(body?.openingHours, 120),
  mapEmbedUrl: safeMapUrl(body?.mapEmbedUrl),
  socials: Object.fromEntries(SOCIAL_KEYS.map((k) => [k, safeUrl(body?.socials?.[k])])) as Record<SocialKey, string>,
  hero: {
    badge: str(body?.hero?.badge, 80),
    title: str(body?.hero?.title, 80),
    highlight: str(body?.hero?.highlight, 60),
    titleEnd: str(body?.hero?.titleEnd, 60),
    subtitle: str(body?.hero?.subtitle, 300),
    nepaliLine: str(body?.hero?.nepaliLine, 120),
  },
  faqs: (Array.isArray(body?.faqs) ? body.faqs : [])
    .slice(0, 20)
    .map((f: any) => ({ q: str(f?.q, 200), a: str(f?.a, 1000) }))
    .filter((f: { q: string; a: string }) => f.q && f.a),
  priceList: (Array.isArray(body?.priceList) ? body.priceList : [])
    .slice(0, 30)
    .map((g: any) => ({
      group: str(g?.group, 80),
      rows: (Array.isArray(g?.rows) ? g.rows : [])
        .slice(0, 50)
        .map((r: any) => ({ item: str(r?.item, 100), price: str(r?.price, 100) }))
        .filter((r: { item: string }) => r.item),
    }))
    .filter((g: { group: string }) => g.group),
});
