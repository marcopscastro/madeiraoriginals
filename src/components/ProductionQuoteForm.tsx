import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SERVICES = [
  "Custom Apparel Printing",
  "DTF Gang Sheets",
  "UV DTF Stickers",
  "Business Merchandise",
  "Rally & Performance",
  "Other / Not sure",
];

const schema = z.object({
  business_name: z.string().trim().min(2, "Business name required").max(120),
  contact_name: z.string().trim().min(2, "Your name required").max(80),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional(),
  service_type: z.string().trim().min(2).max(80),
  quantity: z.string().trim().max(60).optional(),
  deadline: z.string().trim().max(60).optional(),
  message: z.string().trim().max(2000).optional(),
});

const MAX_FILE_MB = 20;

const ProductionQuoteForm = () => {
  const [form, setForm] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    service_type: SERVICES[0],
    quantity: "",
    deadline: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    if (file && file.size > MAX_FILE_MB * 1024 * 1024) {
      return toast.error(`Artwork must be under ${MAX_FILE_MB}MB`);
    }

    setSubmitting(true);
    let artwork_url: string | null = null;

    if (file) {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
      const { error: upErr } = await supabase.storage.from("quote-artwork").upload(path, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });
      if (upErr) {
        setSubmitting(false);
        return toast.error("Could not upload artwork. Try a smaller file.");
      }
      artwork_url = path;
    }

    const d = parsed.data;
    const { error } = await supabase.from("production_quotes").insert({
      business_name: d.business_name,
      contact_name: d.contact_name,
      email: d.email,
      phone: d.phone || null,
      service_type: d.service_type,
      quantity: d.quantity || null,
      deadline: d.deadline || null,
      message: d.message || null,
      artwork_url,
    });

    setSubmitting(false);
    if (error) return toast.error("Could not send. Email studio@madeiraoriginals.pt instead.");
    setDone(true);
    toast.success("Quote request sent — we'll reply within one working day.");
  };

  if (done) {
    return (
      <div className="border border-foreground/10 p-8 text-center">
        <h3 className="font-display text-2xl font-semibold mb-3">Request received.</h3>
        <p className="font-body text-muted-foreground">
          Thanks {form.contact_name.split(" ")[0]}. We'll reply to <strong>{form.email}</strong> within one working day with pricing and next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 border border-foreground/10 p-6 md:p-8">
      <Field label="Business name *" value={form.business_name} onChange={(v) => update("business_name", v)} />
      <Field label="Your name *" value={form.contact_name} onChange={(v) => update("contact_name", v)} />
      <Field label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} />
      <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />

      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">Service *</label>
        <select
          value={form.service_type}
          onChange={(e) => update("service_type", e.target.value)}
          className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
        >
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <Field label="Quantity" value={form.quantity} onChange={(v) => update("quantity", v)} placeholder="e.g. 100 t-shirts" />
      <Field label="Deadline" value={form.deadline} onChange={(v) => update("deadline", v)} placeholder="e.g. June 2026" />

      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">Project details</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          maxLength={2000}
          placeholder="Tell us about the project, materials, finish, brand context…"
          className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">
          Artwork (optional, max {MAX_FILE_MB}MB)
        </label>
        <input
          type="file"
          accept="image/*,application/pdf,.ai,.eps,.svg,.psd"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none file:mr-4 file:py-1 file:px-3 file:border file:border-foreground/30 file:bg-background file:font-heading file:text-xs file:uppercase file:tracking-widest"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-4 hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Request a quote"}
      </button>
    </form>
  );
};

const Field = ({ label, value, onChange, type = "text", placeholder }:
  { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) => (
  <div>
    <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
    />
  </div>
);

export default ProductionQuoteForm;
