import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, ExternalLink, LogOut } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Article = {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  published_at: string | null;
  updated_at: string;
};

const AdminJournal = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth?redirect=/admin/journal");
  }, [loading, user, navigate]);

  const refresh = async () => {
    const { data } = await supabase
      .from("articles")
      .select("id,slug,title,published,published_at,updated_at")
      .order("updated_at", { ascending: false });
    setArticles((data as Article[]) ?? []);
  };

  useEffect(() => {
    if (isAdmin) refresh();
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-body text-muted-foreground">Loading…</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center">
          <div className="max-w-md mx-auto px-4 text-center py-20">
            <h1 className="font-display text-3xl font-semibold mb-4">Admin only</h1>
            <p className="font-body text-muted-foreground mb-6">
              Your account doesn't have admin access. Contact a site owner to be granted the admin role.
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

  const togglePublish = async (a: Article) => {
    setBusy(true);
    const { error } = await supabase
      .from("articles")
      .update({ published: !a.published, published_at: !a.published ? new Date().toISOString() : a.published_at })
      .eq("id", a.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(a.published ? "Unpublished" : "Published");
    refresh();
  };

  const remove = async (a: Article) => {
    if (!confirm(`Delete "${a.title}"? This can't be undone.`)) return;
    const { error } = await supabase.from("articles").delete().eq("id", a.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Admin · Journal" path="/admin/journal" noIndex />
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">Admin</p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold">Journal</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/journal/new"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-widest px-5 py-3 hover:opacity-90"
            >
              <Plus size={14} /> New post
            </Link>
            <button
              onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}
              aria-label="Sign out"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="border border-foreground/10">
          {articles.length === 0 ? (
            <p className="p-6 font-body text-muted-foreground text-center">No articles yet.</p>
          ) : (
            <ul className="divide-y divide-foreground/10">
              {articles.map((a) => (
                <li key={a.id} className="p-4 sm:p-5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base sm:text-lg font-semibold text-foreground truncate">{a.title}</p>
                    <p className="font-heading text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
                      /{a.slug} · {a.published ? "Published" : "Draft"}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePublish(a)}
                    disabled={busy}
                    className="font-heading text-[11px] font-bold uppercase tracking-widest border border-foreground/30 px-3 py-1.5 hover:border-foreground"
                  >
                    {a.published ? "Unpublish" : "Publish"}
                  </button>
                  {a.published && (
                    <Link to={`/journal/${a.slug}`} target="_blank" className="text-muted-foreground hover:text-foreground" aria-label="View"><ExternalLink size={16} /></Link>
                  )}
                  <Link to={`/admin/journal/${a.id}`} className="text-muted-foreground hover:text-foreground" aria-label="Edit"><Edit2 size={16} /></Link>
                  <button onClick={() => remove(a)} className="text-muted-foreground hover:text-destructive" aria-label="Delete"><Trash2 size={16} /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminJournal;
