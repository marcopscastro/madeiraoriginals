import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Link } from "@/components/LocaleLink";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  source?: string;
  variant?: "footer" | "inline";
  ctaLabel?: string;
}

const NewsletterForm = ({ source = "footer", variant = "footer", ctaLabel }: Props) => {
  const { t } = useTranslation();
  const schema = z.object({ email: z.string().email(t("auth.invalidEmail")) });
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) {
      // bot caught — silently succeed
      setDone(true);
      return;
    }
    if (!consent) return;
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.email, source });
    setLoading(false);
    if (error && !error.message.includes("duplicate")) {
      toast.error(t("newsletter.error"));
      return;
    }
    setEmail("");
    setDone(true);
    toast.success(t("newsletter.doneToast"));
  };

  if (done) {
    return (
      <div className="flex items-center justify-center gap-2 border border-foreground/30 px-4 py-3 font-heading text-sm uppercase tracking-widest text-foreground">
        <Check size={16} className="text-primary" />
        {t("newsletter.done")}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full min-w-0">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder={t("newsletter.placeholder")}
        aria-label={t("newsletter.ariaEmail")}
        size={1}
        className="flex-1 min-w-0 bg-background border border-foreground px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
      />
      <Button
        type="submit"
        disabled={loading || !consent}
        className="bg-primary text-primary-foreground font-heading text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-none hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
      >
        {loading ? t("newsletter.joining") : ctaLabel ?? (variant === "inline" ? t("newsletter.join") : t("newsletter.subscribe"))}
      </Button>
      </div>
      <label className="mt-3 flex gap-3 items-start font-body text-xs leading-relaxed text-inherit">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0" />
        <span>{t("newsletter.consent")} <Link to="/privacidade" className="underline underline-offset-2">{t("newsletter.privacyLink")}</Link></span>
      </label>
    </form>
  );
};

export default NewsletterForm;
