"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaXTwitter } from "react-icons/fa6";
import type { SiteSettingsData, SocialKey } from "@/helpers/siteData";

const SOCIALS: { key: SocialKey; label: string; icon: React.ElementType; placeholder: string }[] = [
  { key: "facebook", label: "Facebook", icon: FaFacebookF, placeholder: "https://facebook.com/yourpage" },
  { key: "instagram", label: "Instagram", icon: FaInstagram, placeholder: "https://instagram.com/yourpage" },
  { key: "tiktok", label: "TikTok", icon: FaTiktok, placeholder: "https://tiktok.com/@yourpage" },
  { key: "youtube", label: "YouTube", icon: FaYoutube, placeholder: "https://youtube.com/@yourchannel" },
  { key: "twitter", label: "X (Twitter)", icon: FaXTwitter, placeholder: "https://x.com/yourpage" },
];

const inputClass =
  "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold";

const Section = ({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) => (
  <section className="bg-white rounded-lg shadow p-6 border-t-4 border-brand">
    <h2 className="text-xl font-bold text-brand-dark">{title}</h2>
    {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    <div className="mt-5 space-y-4">{children}</div>
  </section>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block text-sm font-semibold text-gray-700 mb-1">{label}</span>
    {children}
  </label>
);

const SettingsPage = () => {
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get("/api/settings")
      .then((res) => setSettings(res.data.settings))
      .catch(() => toast.error("Failed to load settings", { richColors: true }));
  }, []);

  if (!settings) return <p className="p-8">Loading settings...</p>;

  const set = <K extends keyof SiteSettingsData>(key: K, value: SiteSettingsData[K]) =>
    setSettings({ ...settings, [key]: value });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put("/api/settings", settings);
      setSettings(res.data.settings);
      toast.success("Website updated successfully", { richColors: true });
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to save settings", { richColors: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="p-4 sm:p-8 space-y-8 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Site Settings</h1>
          <p className="text-gray-500">Everything here appears on the public website.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-brand text-white px-6 py-2 rounded-md font-semibold hover:bg-brand-dark disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      <Section title="Business Information">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Business name">
            <input className={inputClass} value={settings.businessName} onChange={(e) => set("businessName", e.target.value)} />
          </Field>
          <Field label="Tagline">
            <input className={inputClass} value={settings.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <Field label="Phone number (shown on site)">
            <input className={inputClass} value={settings.phone} onChange={(e) => set("phone", e.target.value)} />
          </Field>
          <Field label="WhatsApp number (with country code, e.g. 9779824823877)">
            <input className={inputClass} value={settings.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
          </Field>
          <Field label="Email">
            <input type="email" className={inputClass} value={settings.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
          <Field label="Opening hours">
            <input
              className={inputClass}
              placeholder="e.g. Sun – Fri: 9 AM – 8 PM"
              value={settings.openingHours}
              onChange={(e) => set("openingHours", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Address">
          <input className={inputClass} value={settings.address} onChange={(e) => set("address", e.target.value)} />
        </Field>
      </Section>

      <Section title="Home Page Banner" hint="The big heading at the top of the home page. The highlighted words are shown in gold.">
        <Field label="Small badge text">
          <input className={inputClass} value={settings.hero.badge} onChange={(e) => set("hero", { ...settings.hero, badge: e.target.value })} />
        </Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Heading – start">
            <input className={inputClass} value={settings.hero.title} onChange={(e) => set("hero", { ...settings.hero, title: e.target.value })} />
          </Field>
          <Field label="Heading – gold words">
            <input className={inputClass} value={settings.hero.highlight} onChange={(e) => set("hero", { ...settings.hero, highlight: e.target.value })} />
          </Field>
          <Field label="Heading – end">
            <input className={inputClass} value={settings.hero.titleEnd} onChange={(e) => set("hero", { ...settings.hero, titleEnd: e.target.value })} />
          </Field>
        </div>
        <Field label="Nepali tagline (नेपाली लाइन)">
          <input className={`${inputClass} font-nepali`} value={settings.hero.nepaliLine} onChange={(e) => set("hero", { ...settings.hero, nepaliLine: e.target.value })} />
        </Field>
        <Field label="Description">
          <textarea rows={3} className={inputClass} value={settings.hero.subtitle} onChange={(e) => set("hero", { ...settings.hero, subtitle: e.target.value })} />
        </Field>
      </Section>

      <Section title="Social Media Links" hint="Leave a field empty to hide that icon on the website. Links must start with https://">
        <div className="grid sm:grid-cols-2 gap-4">
          {SOCIALS.map(({ key, label, icon: Icon, placeholder }) => (
            <Field key={key} label={label}>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md bg-brand text-gold">
                  <Icon />
                </span>
                <input
                  type="url"
                  className={`${inputClass} rounded-l-none`}
                  placeholder={placeholder}
                  value={settings.socials[key]}
                  onChange={(e) => set("socials", { ...settings.socials, [key]: e.target.value })}
                />
              </div>
            </Field>
          ))}
        </div>
      </Section>

      <Section
        title="Google Map"
        hint="Open your shop on Google Maps → Share → Embed a map → Copy HTML, then paste it here."
      >
        <Field label="Map embed code or URL">
          <textarea rows={3} className={`${inputClass} font-mono text-xs`} value={settings.mapEmbedUrl} onChange={(e) => set("mapEmbedUrl", e.target.value)} />
        </Field>
        {settings.mapEmbedUrl.startsWith("https://www.google.com/maps/embed") && (
          <iframe src={settings.mapEmbedUrl} className="w-full h-64 rounded-md border" loading="lazy" title="Map preview" />
        )}
      </Section>

      <Section title="Frequently Asked Questions">
        {settings.faqs.map((f, i) => (
          <div key={i} className="border border-dashed border-gold rounded-md p-4 space-y-2">
            <div className="flex gap-2">
              <input
                className={inputClass}
                placeholder="Question"
                value={f.q}
                onChange={(e) => set("faqs", settings.faqs.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))}
              />
              <button type="button" onClick={() => set("faqs", settings.faqs.filter((_, j) => j !== i))} className="px-3 text-red-600 font-bold" aria-label="Remove question">
                ✕
              </button>
            </div>
            <textarea
              rows={2}
              className={inputClass}
              placeholder="Answer"
              value={f.a}
              onChange={(e) => set("faqs", settings.faqs.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))}
            />
          </div>
        ))}
        <button type="button" onClick={() => set("faqs", [...settings.faqs, { q: "", a: "" }])} className="text-brand font-semibold hover:text-brand-dark">
          + Add question
        </button>
      </Section>

      <Section title="Price List" hint="Shown on the Price List page.">
        {settings.priceList.map((g, gi) => {
          const updateGroup = (group: typeof g) => set("priceList", settings.priceList.map((x, j) => (j === gi ? group : x)));
          return (
            <div key={gi} className="border border-gray-200 rounded-md p-4 space-y-3 bg-brand-light/30">
              <div className="flex gap-2">
                <input className={`${inputClass} font-semibold`} placeholder="Group name (e.g. Jeans Services)" value={g.group} onChange={(e) => updateGroup({ ...g, group: e.target.value })} />
                <button type="button" onClick={() => set("priceList", settings.priceList.filter((_, j) => j !== gi))} className="px-3 text-red-600 text-sm font-semibold whitespace-nowrap">
                  Remove group
                </button>
              </div>
              {g.rows.map((r, ri) => (
                <div key={ri} className="flex gap-2">
                  <input className={inputClass} placeholder="Service" value={r.item} onChange={(e) => updateGroup({ ...g, rows: g.rows.map((x, j) => (j === ri ? { ...x, item: e.target.value } : x)) })} />
                  <input className={inputClass} placeholder="Price" value={r.price} onChange={(e) => updateGroup({ ...g, rows: g.rows.map((x, j) => (j === ri ? { ...x, price: e.target.value } : x)) })} />
                  <button type="button" onClick={() => updateGroup({ ...g, rows: g.rows.filter((_, j) => j !== ri) })} className="px-3 text-red-600 font-bold" aria-label="Remove row">
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => updateGroup({ ...g, rows: [...g.rows, { item: "", price: "" }] })} className="text-brand text-sm font-semibold">
                + Add price row
              </button>
            </div>
          );
        })}
        <button type="button" onClick={() => set("priceList", [...settings.priceList, { group: "", rows: [{ item: "", price: "" }] }])} className="text-brand font-semibold hover:text-brand-dark">
          + Add price group
        </button>
      </Section>

      <div className="flex justify-end">
        <button type="submit" disabled={saving} className="bg-brand text-white px-8 py-3 rounded-md font-semibold hover:bg-brand-dark disabled:opacity-60">
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </form>
  );
};

export default SettingsPage;
