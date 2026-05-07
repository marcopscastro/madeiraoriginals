import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({ email: z.string().email("Enter a valid email") });

interface Props {
  source?: string;
  variant?: "footer" | "inline";
}

const NewsletterForm = ({ source = "footer", variant = "footer" }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      toast.error("Something went wrong. Try again.");
      return;
    }
    setEmail("");
    toast.success("You're on the list. Welcome to Madeira Originals.");
  };

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email…"
        aria-label="Email address"
        className="flex-1 bg-background border border-foreground px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-primary-foreground font-heading text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-none hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
      >
        {loading ? "Joining…" : variant === "inline" ? "Join" : "Subscribe"}
      </button>
    </form>
  );
};

export default NewsletterForm;
