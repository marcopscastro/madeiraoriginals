import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  author_name: string;
  created_at: string;
  user_id: string;
}

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().max(120).optional(),
  body: z.string().trim().min(10, "Tell us a bit more (min 10 chars)").max(2000),
  author_name: z.string().trim().min(2).max(60),
});

interface Props {
  productHandle: string;
  productTitle: string;
}

const Stars = ({ value, onChange, size = 18 }: { value: number; onChange?: (n: number) => void; size?: number }) => (
  <div className="inline-flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type={onChange ? "button" : undefined}
        onClick={onChange ? () => onChange(n) : undefined}
        className={onChange ? "cursor-pointer" : "cursor-default"}
        aria-label={`${n} stars`}
        disabled={!onChange}
      >
        <Star
          size={size}
          className={n <= value ? "fill-accent text-accent" : "text-foreground/25"}
          strokeWidth={1.5}
        />
      </button>
    ))}
  </div>
);

const ProductReviews = ({ productHandle, productTitle }: Props) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("id,rating,title,body,author_name,created_at,user_id")
      .eq("product_handle", productHandle)
      .eq("approved", true)
      .order("created_at", { ascending: false });
    setReviews((data as Review[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, [productHandle]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => setAuthor(data?.display_name ?? ""));
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = schema.safeParse({ rating, title, body, author_name: author });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      product_handle: productHandle,
      product_title: productTitle,
      user_id: user.id,
      rating: parsed.data.rating,
      title: parsed.data.title || null,
      body: parsed.data.body,
      author_name: parsed.data.author_name,
    });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success("Thanks for your review.");
    setShowForm(false);
    setTitle(""); setBody(""); setRating(5);
    refresh();
  };

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <section id="reviews" className="mt-20 border-t border-foreground/10 pt-12">
      <a id="reviews" />

      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">Reviews</h2>
          {reviews.length > 0 && (
            <div className="mt-2 flex items-center gap-3">
              <Stars value={Math.round(avg)} />
              <span className="font-heading text-sm font-semibold text-foreground">{avg.toFixed(1)}</span>
              <span className="font-body text-sm text-muted-foreground">· {reviews.length} review{reviews.length === 1 ? "" : "s"}</span>
            </div>
          )}
        </div>
        {user ? (
          <button
            onClick={() => setShowForm((s) => !s)}
            className="border border-foreground font-heading font-bold text-xs uppercase tracking-widest px-5 py-3 hover:bg-foreground hover:text-background"
          >
            {showForm ? "Cancel" : "Write a review"}
          </button>
        ) : (
          <Link
            to={`/auth?redirect=/product/${productHandle}`}
            className="border border-foreground font-heading font-bold text-xs uppercase tracking-widest px-5 py-3 hover:bg-foreground hover:text-background"
          >
            Sign in to review
          </Link>
        )}
      </div>

      {showForm && user && (
        <form onSubmit={submit} className="mb-10 border border-foreground/10 p-5 md:p-6 space-y-4">
          <div>
            <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">Rating</label>
            <Stars value={rating} onChange={setRating} size={26} />
          </div>
          <div>
            <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">Your name</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} required maxLength={60} className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none" />
          </div>
          <div>
            <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">Title (optional)</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none" />
          </div>
          <div>
            <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">Review</label>
            <textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} required maxLength={2000} className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none" />
          </div>
          <button type="submit" disabled={submitting} className="bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-3 hover:opacity-90 disabled:opacity-50">
            {submitting ? "Posting…" : "Post review"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="font-body text-muted-foreground">Loading…</p>
      ) : reviews.length === 0 ? (
        <p className="font-body text-muted-foreground">No reviews yet — be the first.</p>
      ) : (
        <ul className="space-y-8">
          {reviews.map((r) => (
            <li key={r.id} className="border-b border-foreground/10 pb-8 last:border-0">
              <Stars value={r.rating} size={16} />
              {r.title && <h3 className="font-display text-lg font-semibold text-foreground mt-2">{r.title}</h3>}
              <p className="font-body text-base text-foreground/80 leading-relaxed mt-2 whitespace-pre-line">{r.body}</p>
              <p className="mt-3 font-heading text-[11px] uppercase tracking-widest text-muted-foreground">
                {r.author_name} · {new Date(r.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductReviews;
export const useProductRating = (handle: string | undefined) => {
  const [stats, setStats] = useState<{ count: number; avg: number } | null>(null);
  useEffect(() => {
    if (!handle) return;
    supabase
      .from("reviews")
      .select("rating", { count: "exact" })
      .eq("product_handle", handle)
      .eq("approved", true)
      .then(({ data, count }) => {
        const ratings = (data ?? []).map((r: { rating: number }) => r.rating);
        const avg = ratings.length ? ratings.reduce((s, n) => s + n, 0) / ratings.length : 0;
        setStats({ count: count ?? 0, avg });
      });
  }, [handle]);
  return stats;
};
