import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

const SECTORS = ["restaurant", "cafe", "bar", "hotel", "bakery", "foodTruck", "other"] as const;
const SERVICES = ["Digital", "Apparel", "Physical"] as const;
type ServiceKey = (typeof SERVICES)[number];

const schema = z.object({
  business_name: z.string().trim().min(2).max(120),
  contact_name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional(),
  horeca_sector: z.string().trim().min(2).max(60),
  required_services: z.array(z.string()).min(1, "Select at least one service"),
  message: z.string().trim().max(2000).optional(),
});

const StudioQuoteForm = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    horeca_sector: "restaurant",
    message: "",
  });
  const [services, setServices] = useState<Record<ServiceKey, boolean>>({
    Digital: false,
    Apparel: true,
    Physical: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggleService = (s: ServiceKey) => setServices((p) => ({ ...p, [s]: !p[s] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const required_services = SERVICES.filter((s) => services[s]);
    const parsed = schema.safeParse({ ...form, required_services });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setSubmitting(true);
    const d = parsed.data;
    const { error } = await supabase.from("production_quotes").insert({
      business_name: d.business_name,
      contact_name: d.contact_name,
      email: d.email,
      phone: d.phone || null,
      service_type: d.required_services.join(", "),
      horeca_sector: d.horeca_sector,
      required_services: d.required_services,
      message: d.message || null,
    });
    setSubmitting(false);
    if (error) return toast.error(t("common.sendFailed"));
    setDone(true);
    toast.success(t("studio.form.done"));
  };

  if (done) {
    return (
      <div className="border border-foreground/20 p-8 text-center">
        <h3 className="font-display text-2xl font-semibold mb-3">{t("studio.form.done")}</h3>
        <p className="font-body text-muted-foreground">{t("studio.form.doneBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 border border-foreground/20 p-6 md:p-8">
      <Field label={t("studio.form.name")} value={form.contact_name} onChange={(v) => update("contact_name", v)} />
      <Field label={t("studio.form.business")} value={form.business_name} onChange={(v) => update("business_name", v)} />
      <Field label={t("studio.form.email")} type="email" value={form.email} onChange={(v) => update("email", v)} />
      <Field label={t("studio.form.phone")} value={form.phone} onChange={(v) => update("phone", v)} />

      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">
          {t("studio.form.sector")}
        </label>
        <select
          value={form.horeca_sector}
          onChange={(e) => update("horeca_sector", e.target.value)}
          className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
        >
          {SECTORS.map((s) => (
            <option key={s} value={s}>
              {t(`studio.form.sectors.${s}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-3 block">
          {t("studio.form.services")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-foreground/15 border border-foreground/20">
          {SERVICES.map((s) => (
            <label
              key={s}
              className={`flex items-center gap-3 bg-background px-4 py-3 cursor-pointer font-heading text-xs font-bold uppercase tracking-widest ${
                services[s] ? "text-primary" : "text-foreground/70"
              }`}
            >
              <input
                type="checkbox"
                checked={services[s]}
                onChange={() => toggleService(s)}
                className="h-4 w-4 accent-primary"
              />
              {t(`studio.form.service${s}`)}
            </label>
          ))}
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">
          {t("studio.form.message")}
        </label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          maxLength={2000}
          className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-4 hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? t("studio.form.sending") : t("studio.form.submit")}
      </button>
    </form>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div>
    <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
    />
  </div>
);

export default StudioQuoteForm;
