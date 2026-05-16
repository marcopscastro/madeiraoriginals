import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "mo_wholesale_token";

const WholesaleGate = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"checking" | "locked" | "unlocked">("checking");
  const [passcode, setPasscode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem(STORAGE_KEY);
    if (!token) {
      setStatus("locked");
      return;
    }
    supabase.functions
      .invoke("validate-wholesale-token", { body: { token } })
      .then(({ data, error: e }) => {
        if (e || !data?.valid) {
          sessionStorage.removeItem(STORAGE_KEY);
          setStatus("locked");
        } else {
          setStatus("unlocked");
        }
      });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { data, error: err } = await supabase.functions.invoke("verify-wholesale-passcode", {
      body: { passcode },
    });
    setSubmitting(false);
    if (err || !data?.token) {
      setError(t("wholesale.gate.invalid"));
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, data.token);
    setStatus("unlocked");
  };

  if (status === "checking") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-body text-sm text-muted-foreground">
        …
      </div>
    );
  }

  if (status === "unlocked") return <>{children}</>;

  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="max-w-md mx-auto w-full px-4 sm:px-6 py-16">
        <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-accent mb-4">
          {t("tagline")}
        </p>
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
          {t("wholesale.gate.overline")}
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
          {t("wholesale.gate.heading")}
        </h1>
        <p className="mt-4 font-body text-base text-muted-foreground">{t("wholesale.gate.body")}</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <input
            type="password"
            autoFocus
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder={t("wholesale.gate.placeholder")}
            className="w-full bg-background border border-foreground/30 px-4 py-4 font-body text-base focus:outline-none focus:border-foreground rounded-none tracking-widest"
          />
          {error && <p className="font-body text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={submitting || passcode.length === 0}
            className="w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-4 hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? t("wholesale.gate.checking") : t("wholesale.gate.submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export const wholesaleSignOut = () => sessionStorage.removeItem(STORAGE_KEY);

export default WholesaleGate;
