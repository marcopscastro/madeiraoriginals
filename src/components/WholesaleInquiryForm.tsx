import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

const LINES = ["Corner Line tees", "White-label DTF", "UV DTF stickers"] as const;
type LineKey = (typeof LINES)[number];
const LINE_I18N: Record<LineKey, string> = {
  "Corner Line tees": "wholesale.form.lineCorner",
  "White-label DTF": "wholesale.form.lineWhiteLabel",
  "UV DTF stickers": "wholesale.form.lineUv",
};

const schema = z.object({
  business_name: z.string().trim().min(2).max(120),
  contact_name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional(),
  product_lines: z.array(z.string()).min(1, "Select at least one product line"),
  estimated_volume: z.string().trim().max(60).optional(),
  delivery_window: z.string().trim().max(60).optional(),
  notes: z.string().trim().max(2000).optional(),
});

const WholesaleInquiryForm = ({ defaultLine }: { defaultLine?: LineKey }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    estimated_volume: "",
    delivery_window: "",
    notes: "",
  });
  const [lines, setLines] = useState<Record<LineKey, boolean>>({
    "Corner Line tees": defaultLine === "Corner Line tees",
    "White-label DTF": defaultLine === "White-label DTF",
    "UV DTF stickers": defaultLine === "UV DTF stickers",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggleLine = (l: LineKey) => setLines((p) => ({ ...p, [l]: !p[l] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product_lines = LINES.filter((l) => lines[l]);
    const parsed = schema.safeParse({ ...form, product_lines });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setSubmitting(true);
    const d = parsed.data;
    const { error } = await supabase.from("wholesale_inquiries").insert({
      business_name: d.business_name,
      contact_name: d.contact_name,
      email: d.email,
      phone: d.phone || null,
      product_lines: d.product_lines,
      estimated_volume: d.estimated_volume || null,
      delivery_window: d.delivery_window || null,
      notes: d.notes || null,
    });
    setSubmitting(false);
    if (error) return toast.error(t("common.sendFailed"));
    setDone(true);
    toast.success(t("wholesale.form.done"));
  };

  if (done) {
    return (
      <div className="border border-foreground/20 p-8 text-center">
        <h3 className="font-display text-2xl font-semibold mb-3">{t("wholesale.form.done")}</h3>
        <p className="font-body text-muted-foreground">{t("wholesale.form.doneBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 border border-foreground/20 p-6 md:p-8">
      <Field label={t("wholesale.form.business")} value={form.business_name} onChange={(v) => update("business_name", v)} />
      <Field label={t("wholesale.form.contact")} value={form.contact_name} onChange={(v) => update("contact_name", v)} />
      <Field label={t("wholesale.form.email")} type="email" value={form.email} onChange={(v) => update("email", v)} />
      <Field label={t("wholesale.form.phone")} value={form.phone} onChange={(v) => update("phone", v)} />

      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-3 block">
          {t("wholesale.form.lines")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-foreground/15 border border-foreground/20">
          {LINES.map((l) => (
            <label
              key={l}
              className={`flex items-center gap-3 bg-background px-4 py-3 cursor-pointer font-heading text-xs font-bold uppercase tracking-widest ${
                lines[l] ? "text-primary" : "text-foreground/70"
              }`}
            >
              <input
                type="checkbox"
                checked={lines[l]}
                onChange={() => toggleLine(l)}
                className="h-4 w-4 accent-primary"
              />
              {t(LINE_I18N[l])}
            </label>
          ))}
        </div>
      </div>

      <Field label={t("wholesale.form.volume")} value={form.estimated_volume} onChange={(v) => update("estimated_volume", v)} placeholder={t("wholesale.form.volumeHint")} />
      <Field label={t("wholesale.form.window")} value={form.delivery_window} onChange={(v) => update("delivery_window", v)} placeholder={t("wholesale.form.windowHint")} />

      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">
          {t("wholesale.form.notes")}
        </label>
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          maxLength={2000}
          className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-4 hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? t("wholesale.form.sending") : t("wholesale.form.submit")}
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
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
    />
  </div>
);

export default WholesaleInquiryForm;
