import { Link } from "react-router-dom";
import studioImg from "@/assets/production-studio.jpg";

const services = [
  { label: "Custom Apparel Printing", anchor: "custom-apparel" },
  { label: "DTF Gang Sheets", anchor: "dtf" },
  { label: "UV DTF Stickers", anchor: "uv-dtf" },
  { label: "Business Merchandise", anchor: "business-merch" },
  { label: "Rally & Performance Teams", anchor: "rally" },
];

const ProductionStudioPreview = () => (
  <section className="bg-background border-y border-foreground/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
          Production Studio
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
          Custom apparel.<br />
          <span className="italic">Built in Madeira.</span>
        </h2>
        <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
          Custom apparel, DTF gang sheets, UV DTF stickers, and technical print solutions for
          brands, businesses, restaurants, teams, and creators.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-2">
          {services.map((s) => (
            <li key={s.anchor}>
              <Link
                to={`/production-studio#${s.anchor}`}
                className="block py-2 border-b border-foreground/10 font-heading text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
              >
                → {s.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/production-studio"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:opacity-90 transition-opacity"
          >
            View Production Services
          </Link>
          <Link
            to="/production-studio#quote"
            className="inline-flex items-center justify-center border border-foreground text-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <img
          src={studioImg}
          alt="Custom apparel printing studio with DTF gang sheet and rack of garments by Madeira Originals"
          width={1280}
          height={960}
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  </section>
);

export default ProductionStudioPreview;
