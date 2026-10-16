"use client";
import { useState } from "react";

export default function InquiryForm({ propertyId, propertyTitle }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault(); setError("");
    const form = new FormData(e.currentTarget);
    const payload = { name: form.get("name"), email: form.get("email"), message: form.get("message"), propertyId };
    const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Please try again."); return; }
    setDone(true);
  }
  if (done) return <div className="success-state"><strong>Inquiry sent successfully</strong><p>Your message about {propertyTitle} has been saved in the demo inbox.</p></div>;
  return <form className="inquiry-form" onSubmit={submit}><h3>Interested in this property?</h3><p>Send a message to the property manager.</p>{error && <div className="form-error">{error}</div>}<label className="field"><span>Your name</span><input name="name" required minLength="2" placeholder="Full name"/></label><label className="field"><span>Email address</span><input name="email" type="email" required placeholder="you@example.com"/></label><label className="field"><span>Message</span><textarea name="message" required rows="3" defaultValue={`Hello, I would like to know more about ${propertyTitle}.`}/></label><button className="button button-primary button-wide">Send inquiry</button></form>;
}
