"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import type { ServiceData } from "@/helpers/siteData";

const emptyForm: ServiceData = { title: "", description: "", image: "", category: "cloth", order: 0, isActive: true };

const inputClass =
  "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold";

const CATEGORY_LABELS = { bag: "Bag Repair", cloth: "Cloth Repair & Alteration", other: "Other" };

const ServicesPage = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ServiceData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/api/services");
      setServices(res.data.services);
    } catch {
      toast.error("Failed to load services", { richColors: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await axios.post("/api/upload", data);
      setForm((f) => ({ ...f, image: res.data.url }));
      toast.success("Image uploaded", { richColors: true });
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Image upload failed", { richColors: true });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await axios.put(`/api/services/${editingId}`, form);
        toast.success("Service updated", { richColors: true });
      } else {
        await axios.post("/api/services", form);
        toast.success("Service added", { richColors: true });
      }
      resetForm();
      fetchServices();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to save service", { richColors: true });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await axios.delete(`/api/services/${id}`);
      toast.success("Service deleted", { richColors: true });
      fetchServices();
    } catch {
      toast.error("Failed to delete service", { richColors: true });
    }
  };

  const importDefaults = async () => {
    try {
      await axios.post("/api/services", { importDefaults: true });
      toast.success("Default services imported. You can now edit them.", { richColors: true });
      fetchServices();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Import failed", { richColors: true });
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Services</h1>
        <p className="text-gray-500">These services are shown on the home page and the Services page.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 border-t-4 border-brand space-y-4 max-w-3xl">
        <h2 className="text-xl font-bold text-brand-dark">{editingId ? "Edit Service" : "Add New Service"}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-semibold text-gray-700 mb-1">Title</span>
            <input className={inputClass} required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-gray-700 mb-1">Category</span>
            <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ServiceData["category"] })}>
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-semibold text-gray-700 mb-1">Description</span>
          <textarea rows={3} className={inputClass} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>
        <div className="grid sm:grid-cols-3 gap-4 items-end">
          <label className="block sm:col-span-2">
            <span className="block text-sm font-semibold text-gray-700 mb-1">Image</span>
            <input type="file" accept="image/*" onChange={handleUpload} className="block w-full text-sm" />
            {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-gray-700 mb-1">Display order</span>
            <input type="number" className={inputClass} value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </label>
        </div>
        {form.image && <img src={form.image} alt="Service preview" className="h-32 rounded-md object-cover border" />}
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          <span className="text-sm text-gray-700">Show on website</span>
        </label>
        <div className="flex gap-3">
          <button type="submit" disabled={saving || uploading} className="bg-brand text-white px-6 py-2 rounded-md font-semibold hover:bg-brand-dark disabled:opacity-60">
            {saving ? "Saving..." : editingId ? "Update Service" : "Add Service"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-6 py-2 rounded-md border border-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading services...</p>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 max-w-3xl">
          <p className="text-gray-600">
            No services saved yet. The website is currently showing its built-in services. Import them to start editing.
          </p>
          <button onClick={importDefaults} className="mt-4 bg-gold text-brand-dark font-semibold px-6 py-2 rounded-md hover:bg-gold-light">
            Import Built-in Services
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s._id} className={`bg-white rounded-lg shadow overflow-hidden ${s.isActive ? "" : "opacity-60"}`}>
              {s.image && <img src={s.image} alt={s.title} className="h-40 w-full object-cover" />}
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-brand-dark">{s.title}</h3>
                  <span className="text-xs bg-brand-light text-brand px-2 py-0.5 rounded-full whitespace-nowrap">{CATEGORY_LABELS[s.category]}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{s.description}</p>
                {!s.isActive && <p className="text-xs text-red-600 mt-2">Hidden from website</p>}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setForm({ ...emptyForm, ...s });
                      setEditingId(s._id!);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-gold text-brand-dark font-semibold px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(s._id!)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
