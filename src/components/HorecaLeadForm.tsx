import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  business_name: z.string().trim().min(2, "Business name required").max(120),
  contact_name: z.string().trim().min(2, "Your name required").max(80),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional(),
  product_type: z.string().trim().max(80).optional(),
  estimated_quantity: z.string().trim().max(60).optional(),
  deadline: z.string().trim().max(60).optional(),
  message: z.string().trim().max(1500).optional(),
});

const HorecaLeadForm = () => {
  const [form, setForm] = useState({
    business_name: "", contact_name: "", email: "", phone: "",
    product_type: "Custom pint glasses", estimated_quantity: "", deadline: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setSubmitting(true);
    const { error } = await supabase.from("horeca_leads").insert(parsed.data as Required<Pick<typeof parsed.data, "business_name" | "contact_name" | "email">> & typeof parsed.data);
    setSubmitting(false);
    if (error) return toast.error("Could not send. Try again or email hello@madeiraoriginals.pt");
    setDone(true);
    toast.success("Quote request sent — we'll be in touch within 24h.");
  };

  if (done) {
    return (
      <div className="border border-foreground/10 p-8 text-center">
        <h3 className="font-display text-2xl font-semibold mb-3">Request received.</h3>
        <p className="font-body text-muted-foreground">
          Thanks {form.contact_name.split(" ")[0]}. We'll reply to <strong>{form.email}</strong> within 24 hours with pricing and next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 border border-foreground/10 p-6 md:p-8">
      <Input label="Business name *" value={form.business_name} onChange={(v) => update("business_name", v)} />
      <Input label="Your name *" value={form.contact_name} onChange={(v) => update("contact_name", v)} />
      <Input label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} />
      <Input label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
      <Input label="Product type" value={form.product_type} onChange={(v) => update("product_type", v)} placeholder="e.g. branded pint glasses" />
      <Input label="Estimated quantity" value={form.estimated_quantity} onChange={(v) => update("estimated_quantity", v)} placeholder="e.g. 200 units" />
      <Input label="Deadline" value={form.deadline} onChange={(v) => update("deadline", v)} placeholder="e.g. June 2026" className="sm:col-span-2" />
      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">Anything else</label>
        <textarea rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={1500}
          className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none" />
      </div>
      <button type="submit" disabled={submitting}
        className="sm:col-span-2 bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-4 hover:opacity-90 disabled:opacity-50">
        {submitting ? "Sending…" : "Request a quote"}
      </button>
    </form>
  );
};

const Input = ({ label, value, onChange, type = "text", placeholder, className = "" }:
  { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; className?: string }) => (
  <div className={className}>
    <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none" />
  </div>
);

export default HorecaLeadForm;
