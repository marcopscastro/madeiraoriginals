import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { user } = useAuth();

  const schema = z.object({
    email: z.string().trim().email(t("auth.invalidEmail")).max(255),
    password: z.string().min(8, t("auth.shortPassword")).max(128),
  });

  useEffect(() => {
    if (user) navigate(redirect, { replace: true });
  }, [user, navigate, redirect]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: { emailRedirectTo: window.location.origin },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success(t("auth.checkEmail"));
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: parsed.data.email, password: parsed.data.password });
      setLoading(false);
      if (error) return toast.error(error.message);
    }
  };

  const google = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + redirect,
    });
    if (result.error) toast.error(t("auth.googleError"));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageSEO routeKey="auth" noIndex />
      <Header />
      <main className="flex-1 flex items-center">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6 py-12">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2 text-center">
            {mode === "login" ? t("auth.titleLogin") : t("auth.titleSignup")}
          </h1>
          <p className="font-body text-sm text-muted-foreground text-center mb-8">
            {t("auth.subtitle")}
          </p>

          <button
            onClick={google}
            className="w-full border border-foreground text-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            {t("auth.google")}
          </button>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground font-heading">
            <div className="flex-1 border-t border-foreground/15" />
            {t("auth.or")}
            <div className="flex-1 border-t border-foreground/15" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              required
              placeholder={t("auth.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
            />
            <input
              type="password"
              required
              placeholder={t("auth.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-3 hover:opacity-90 disabled:opacity-50 rounded-none"
            >
              {loading ? t("auth.loading") : mode === "login" ? t("auth.signIn") : t("auth.createAccount")}
            </button>
          </form>

          <p className="mt-6 text-center font-body text-sm text-muted-foreground">
            {mode === "login" ? t("auth.newHere") : t("auth.haveAccount")}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-primary underline underline-offset-4"
            >
              {mode === "login" ? t("auth.createAccount") : t("auth.signIn")}
            </button>
          </p>
          <p className="mt-2 text-center">
            <Link to="/" className="font-heading text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
              {t("auth.backToSite")}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
