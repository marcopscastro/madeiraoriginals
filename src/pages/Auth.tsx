import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Use at least 8 characters").max(128),
});

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { user } = useAuth();

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
      toast.success("Check your email to confirm your account.");
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
    if (result.error) toast.error("Could not sign in with Google.");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageSEO routeKey="auth" noIndex />
      <Header />
      <main className="flex-1 flex items-center">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6 py-12">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2 text-center">
            {mode === "login" ? "Sign in." : "Create an account."}
          </h1>
          <p className="font-body text-sm text-muted-foreground text-center mb-8">
            Reviews, admin tools, and early access to drops.
          </p>

          <button
            onClick={google}
            className="w-full border border-foreground text-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground font-heading">
            <div className="flex-1 border-t border-foreground/15" />
            or
            <div className="flex-1 border-t border-foreground/15" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-3 hover:opacity-90 disabled:opacity-50 rounded-none"
            >
              {loading ? "…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center font-body text-sm text-muted-foreground">
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-primary underline underline-offset-4"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
          <p className="mt-2 text-center">
            <Link to="/" className="font-heading text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
              ← Back to site
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
