import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

const PROJECT_TYPES = [
  "tshirts",
  "uniforms",
  "events",
  "merch",
  "stickers",
  "other",
] as const;
type ProjectType = (typeof PROJECT_TYPES)[number];

const schema = z.object({
  business_name: z.string().trim().min(2).max(120),
  contact_name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional(),
  project_type: z.string().trim().min(2).max(60),
  quantity: z.string().trim().max(40).optional(),
  message: z.string().trim().max(2000).optional(),
});

const CustomQuoteForm = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    project_type: "tshirts" as ProjectType,
    quantity: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setSubmitting(true);
    const d = parsed.data;
    const message = [
      d.quantity ? `Estimated quantity: ${d.quantity}` : null,
      d.message || null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const { error } = await supabase.from("production_quotes").insert({
      business_name: d.business_name,
      contact_name: d.contact_name,
      email: d.email,
      phone: d.phone || null,
      service_type: `Custom: ${t(`custom.form.projectTypes.${d.project_type}`)}`,
      horeca_sector: "other",
      required_services: ["Apparel"],
      message: message || null,
    });
    setSubmitting(false);
    if (error) return toast.error(t("common.sendFailed"));
    setDone(true);
    toast.success(t("custom.form.done"));
  };

  if (done) {
    return (
      <div className="border border-foreground/20 p-8 text-center">
        <h3 className="font-display text-2xl font-semibold mb-3">{t("custom.form.done")}</h3>
        <p className="font-body text-muted-foreground">{t("custom.form.doneBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 border border-foreground/20 p-6 md:p-8">
      <Field label={t("custom.form.name")} value={form.contact_name} onChange={(v) => update("contact_name", v)} />
      <Field label={t("custom.form.business")} value={form.business_name} onChange={(v) => update("business_name", v)} />
      <Field label={t("custom.form.email")} type="email" value={form.email} onChange={(v) => update("email", v)} />
      <Field label={t("custom.form.phone")} value={form.phone} onChange={(v) => update("phone", v)} />

      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">
          {t("custom.form.projectType")}
        </label>
        <select
          value={form.project_type}
          onChange={(e) => update("project_type", e.target.value as ProjectType)}
          className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
        >
          {PROJECT_TYPES.map((p) => (
            <option key={p} value={p}>
              {t(`custom.form.projectTypes.${p}`)}
            </option>
          ))}
        </select>
      </div>

      <Field label={t("custom.form.quantity")} value={form.quantity} onChange={(v) => update("quantity", v)} placeholder={t("custom.form.quantityHint")} />

      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">
          {t("custom.form.message")}
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          maxLength={2000}
          placeholder={t("custom.form.messageHint")}
          className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-4 hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? t("custom.form.sending") : t("custom.form.submit")}
      </button>
    </form>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
    />
  </div>
);

export default CustomQuoteForm;
