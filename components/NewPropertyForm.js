"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

export default function NewPropertyForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    for (const key of ["price", "beds", "baths", "area"]) payload[key] = Number(payload[key]);
    try {
      const response = await fetch("/api/properties", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save property");
      router.push(`/properties/${result.property.id}`);
      router.refresh();
    } catch (err) { setError(err.message); setBusy(false); }
  }
  return <form className="form-card property-form" onSubmit={submit}><div className="form-section-title"><span>01</span><div><h2>Property information</h2><p>Add the basic details buyers and tenants need.</p></div></div>{error && <div className="form-error" role="alert">{error}</div>}<div className="form-grid"><label className="field full"><span>Property title *</span><input name="title" required minLength="3" placeholder="e.g. Modern Family Villa"/></label><label className="field full"><span>Location *</span><input name="location" required placeholder="Neighborhood, city"/></label><label className="field"><span>Listing type *</span><select name="status" required><option>For Sale</option><option>For Rent</option></select></label><label className="field"><span>Property category *</span><select name="type" required><option>Apartment</option><option>Villa</option><option>House</option><option>Studio</option><option>Townhouse</option><option>Commercial</option></select></label><label className="field"><span>Price (ETB) *</span><input name="price" type="number" min="1" required placeholder="12500000"/></label><label className="field"><span>Area (m²) *</span><input name="area" type="number" min="1" required placeholder="180"/></label><label className="field"><span>Bedrooms</span><input name="beds" type="number" min="0" defaultValue="3"/></label><label className="field"><span>Bathrooms</span><input name="baths" type="number" min="0" defaultValue="2"/></label><label className="field full"><span>Image URL</span><input name="image" type="url" defaultValue="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" placeholder="https://..."/></label><label className="field full"><span>Description *</span><textarea name="description" required rows="4" placeholder="Describe the property's key features..."/></label></div><div className="form-actions"><p>* Required fields</p><button className="button button-primary" disabled={busy}><Save size={17}/>{busy ? "Saving..." : "Save property"}</button></div></form>;
}
