import { PAGE_SEO, type PageSeoKey, type PageSeoTemplate } from "@/lib/seoTemplates";
import { cn } from "@/lib/utils";

interface Props {
  routeKey?: PageSeoKey;
  template?: PageSeoTemplate;
  /** Optional override for the eyebrow label. */
  eyebrow?: string;
  /** Optional override for the H1 text. */
  h1?: string;
  /** Optional override for the intro paragraph. */
  intro?: string;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg";
}

/**
 * Standard page hero — eyebrow + H1 + intro — sourced from seoTemplates so
 * the on-page heading mirrors the meta title/keyword for that route.
 */
const PageHero = ({
  routeKey,
  template,
  eyebrow,
  h1,
  intro,
  align = "center",
  className,
  size = "lg",
}: Props) => {
  const t = template ?? (routeKey ? PAGE_SEO[routeKey] : undefined);
  if (!t && !h1) return null;

  const eyebrowText = eyebrow ?? t?.eyebrow;
  const headingText = h1 ?? t?.h1 ?? "";
  const introText = intro ?? t?.intro;

  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const headingSize =
    size === "lg"
      ? "text-4xl md:text-6xl"
      : "text-4xl md:text-5xl";

  return (
    <header className={cn("max-w-3xl mb-10", alignClass, className)}>
      {eyebrowText && (
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
          {eyebrowText}
        </p>
      )}
      <h1 className={cn("font-display font-semibold text-foreground leading-[1.05]", headingSize)}>
        {headingText}
      </h1>
      {introText && (
        <p className="mt-4 font-body text-base md:text-lg text-muted-foreground">
          {introText}
        </p>
      )}
    </header>
  );
};

export default PageHero;
