import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Form = {
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  cover_url: string;
  tags: string;
  seo_title: string;
  seo_description: string;
  published: boolean;
};

const empty: Form = {
  slug: "",
  title: "",
  excerpt: "",
  body_md: "",
  cover_url: "",
  tags: "",
  seo_title: "",
  seo_description: "",
  published: false,
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);

const AdminJournalEdit = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { isAdmin, loading } = useAuth();
  const [form, setForm] = useState<Form>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) navigate("/auth?redirect=/admin/journal");
  }, [loading, isAdmin, navigate]);

  useEffect(() => {
    if (isNew || !isAdmin) return;
    (async () => {
      const { data } = await supabase.from("articles").select("*").eq("id", id!).maybeSingle();
      if (data) {
        setForm({
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt ?? "",
          body_md: data.body_md,
          cover_url: data.cover_url ?? "",
          tags: (data.tags ?? []).join(", "),
          seo_title: data.seo_title ?? "",
          seo_description: data.seo_description ?? "",
          published: data.published,
        });
      }
    })();
  }, [id, isNew, isAdmin]);

  const update = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const uploadCover = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be under 5MB");
    setUploading(true);
    const path = `${Date.now()}-${slugify(file.name)}`;
    const { error } = await supabase.storage.from("journal-covers").upload(path, file, { upsert: false });
    if (error) {
      setUploading(false);
      return toast.error(error.message);
    }
    const { data } = supabase.storage.from("journal-covers").getPublicUrl(path);
    update("cover_url", data.publicUrl);
    setUploading(false);
    toast.success("Cover uploaded");
  };

  const save = async () => {
    if (!form.title.trim() || !form.body_md.trim()) {
      return toast.error("Title and body are required");
    }
    const slug = form.slug.trim() || slugify(form.title);
    const payload = {
      slug,
      title: form.title.trim(),
      excerpt: form.excerpt.trim() || null,
      body_md: form.body_md,
      cover_url: form.cover_url.trim() || null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      seo_title: form.seo_title.trim() || null,
      seo_description: form.seo_description.trim() || null,
      published: form.published,
      published_at: form.published ? new Date().toISOString() : null,
    };
    setSaving(true);
    if (isNew) {
      const { data, error } = await supabase.from("articles").insert(payload).select("id").single();
      setSaving(false);
      if (error) return toast.error(error.message);
      toast.success("Article created");
      navigate(`/admin/journal/${data!.id}`);
    } else {
      const { error } = await supabase.from("articles").update(payload).eq("id", id!);
      setSaving(false);
      if (error) return toast.error(error.message);
      toast.success("Saved");
    }
  };

  if (loading || !isAdmin) return <div className="min-h-screen flex items-center justify-center font-body text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Admin · Edit article" path="/admin/journal" noIndex />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate("/admin/journal")} className="font-heading text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6">
          ← All articles
        </button>
        <h1 className="font-display text-2xl md:text-3xl font-semibold mb-8">
          {isNew ? "New article" : "Edit article"}
        </h1>

        <div className="space-y-5">
          <Field label="Title">
            <input className={inp} value={form.title} onChange={(e) => update("title", e.target.value)} onBlur={() => !form.slug && update("slug", slugify(form.title))} />
          </Field>
          <Field label="Slug" hint="URL: /journal/{slug}">
            <input className={inp} value={form.slug} onChange={(e) => update("slug", slugify(e.target.value))} />
          </Field>
          <Field label="Excerpt">
            <textarea rows={2} className={inp} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} />
          </Field>
          <Field label="Cover image">
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} className="font-body text-sm" />
              {uploading && <span className="font-heading text-xs uppercase tracking-widest text-muted-foreground">Uploading…</span>}
            </div>
            {form.cover_url && (
              <img src={form.cover_url} alt="cover" className="mt-3 w-full max-w-md aspect-[16/9] object-cover" />
            )}
            <input className={`${inp} mt-2`} placeholder="Or paste a URL" value={form.cover_url} onChange={(e) => update("cover_url", e.target.value)} />
          </Field>
          <Field label="Tags" hint="Comma separated">
            <input className={inp} value={form.tags} onChange={(e) => update("tags", e.target.value)} />
          </Field>
          <Field label="Body (Markdown)">
            <div className="flex justify-end mb-2">
              <button onClick={() => setPreview((p) => !p)} className="font-heading text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
                {preview ? "Edit" : "Preview"}
              </button>
            </div>
            {preview ? (
              <div className="border border-foreground/15 p-5 prose-editorial min-h-[400px]">
                <ReactMarkdown>{form.body_md}</ReactMarkdown>
              </div>
            ) : (
              <textarea rows={20} className={`${inp} font-mono text-sm`} value={form.body_md} onChange={(e) => update("body_md", e.target.value)} />
            )}
          </Field>
          <Field label="SEO title">
            <input className={inp} value={form.seo_title} onChange={(e) => update("seo_title", e.target.value)} />
          </Field>
          <Field label="SEO description">
            <textarea rows={2} className={inp} value={form.seo_description} onChange={(e) => update("seo_description", e.target.value)} />
          </Field>
          <label className="flex items-center gap-3 font-heading text-sm font-semibold uppercase tracking-wide">
            <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
            Published
          </label>

          <div className="flex gap-3 pt-4 border-t border-foreground/10">
            <button onClick={save} disabled={saving} className="bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-3 hover:opacity-90 disabled:opacity-50">
              {saving ? "Saving…" : "Save"}
            </button>
            <button onClick={() => navigate("/admin/journal")} className="border border-foreground/30 font-heading font-bold text-sm uppercase tracking-widest px-6 py-3 hover:border-foreground">
              Cancel
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const inp = "w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none";

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div>
    <label className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-2 block">
      {label} {hint && <span className="text-muted-foreground font-normal normal-case tracking-normal">— {hint}</span>}
    </label>
    {children}
  </div>
);

export default AdminJournalEdit;
