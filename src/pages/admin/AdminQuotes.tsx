import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Quote = {
  id: string;
  created_at: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  service_type: string;
  quantity: string | null;
  deadline: string | null;
  message: string | null;
  artwork_url: string | null;
  status: string;
};

const STATUSES = ["new", "contacted", "quoted", "won", "lost"];

const AdminQuotes = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth?redirect=/admin/quotes");
  }, [loading, user, navigate]);

  const refresh = async () => {
    const { data } = await supabase
      .from("production_quotes")
      .select("*")
      .order("created_at", { ascending: false });
    setQuotes((data as Quote[]) ?? []);
  };

  useEffect(() => { if (isAdmin) refresh(); }, [isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-body text-muted-foreground">Loading…</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center">
          <div className="max-w-md mx-auto px-4 text-center py-20">
            <h1 className="font-display text-3xl font-semibold mb-4">Admin only</h1>
            <p className="font-body text-muted-foreground mb-6">
              Your account doesn't have admin access.
            </p>
            <button
              onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}
              className="font-heading text-sm font-semibold uppercase tracking-wide text-primary"
            >
              Sign out
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const setStatus = async (q: Quote, status: string) => {
    setBusy(true);
    const { error } = await supabase.from("production_quotes").update({ status }).eq("id", q.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Status updated");
    refresh();
  };

  const downloadArtwork = async (path: string) => {
    const { data, error } = await supabase.storage.from("quote-artwork").createSignedUrl(path, 60 * 5);
    if (error || !data) return toast.error("Could not generate download link");
    window.open(data.signedUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Admin · Production Quotes" path="/admin/quotes" noIndex />
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">Admin</p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold">Production Quotes</h1>
          </div>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}
            aria-label="Sign out"
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut size={18} />
          </button>
        </div>

        {quotes.length === 0 ? (
          <p className="border border-foreground/10 p-6 font-body text-muted-foreground text-center">No quote requests yet.</p>
        ) : (
          <ul className="space-y-4">
            {quotes.map((q) => (
              <li key={q.id} className="border border-foreground/10 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-display text-lg font-semibold">{q.business_name}</p>
                    <p className="font-body text-sm text-muted-foreground">
                      {q.contact_name} · <a href={`mailto:${q.email}`} className="text-primary underline underline-offset-2">{q.email}</a>
                      {q.phone ? ` · ${q.phone}` : ""}
                    </p>
                    <p className="font-heading text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
                      {new Date(q.created_at).toLocaleString()}
                    </p>
                  </div>
                  <select
                    value={q.status}
                    disabled={busy}
                    onChange={(e) => setStatus(q, e.target.value)}
                    className="bg-background border border-foreground/30 px-3 py-2 font-heading text-xs uppercase tracking-widest rounded-none"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <dl className="grid sm:grid-cols-3 gap-3 font-body text-sm mb-3">
                  <div><dt className="font-heading text-[11px] uppercase tracking-widest text-muted-foreground">Service</dt><dd>{q.service_type}</dd></div>
                  <div><dt className="font-heading text-[11px] uppercase tracking-widest text-muted-foreground">Quantity</dt><dd>{q.quantity || "—"}</dd></div>
                  <div><dt className="font-heading text-[11px] uppercase tracking-widest text-muted-foreground">Deadline</dt><dd>{q.deadline || "—"}</dd></div>
                </dl>
                {q.message && (
                  <p className="font-body text-sm text-foreground/90 whitespace-pre-wrap border-t border-foreground/10 pt-3">{q.message}</p>
                )}
                {q.artwork_url && (
                  <button
                    onClick={() => downloadArtwork(q.artwork_url!)}
                    className="mt-3 inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-widest text-primary hover:opacity-70"
                  >
                    <Download size={14} /> Download artwork
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminQuotes;
