import mongoose, { Schema } from "mongoose";

// Single document holding all admin-editable website content (contact info, socials, map, hero text, FAQs, price list)
const siteSettingsSchema = new Schema(
  {
    key: { type: String, default: "main", unique: true },
    businessName: String,
    tagline: String,
    phone: String,
    whatsapp: String,
    email: String,
    address: String,
    openingHours: String,
    mapEmbedUrl: String,
    socials: {
      facebook: String,
      instagram: String,
      tiktok: String,
      youtube: String,
      twitter: String,
    },
    hero: {
      badge: String,
      title: String,
      highlight: String,
      titleEnd: String,
      subtitle: String,
      nepaliLine: String,
    },
    faqs: [{ q: String, a: String }],
    priceList: [
      {
        group: String,
        rows: [{ item: String, price: String }],
      },
    ],
  },
  { timestamps: true }
);

const SiteSettings = mongoose.models.SiteSettings || mongoose.model("SiteSettings", siteSettingsSchema);
export default SiteSettings;
