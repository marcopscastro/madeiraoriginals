import heroImage from "@/assets/hero-image.png";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div className="order-2 md:order-1">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide text-foreground leading-tight">
            Madeiran heritage.<br />
            <span className="text-primary">Zero stiffness.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground font-body max-w-lg">
            Original T-shirts, canvas goods, and apparel that take our island roots seriously—but not too seriously.
          </p>
          <a
            href="#bestsellers"
            className="mt-8 inline-block bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-none hover:opacity-90 transition-opacity"
          >
            Shop the Originals
          </a>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2">
          <img
            src={heroImage}
            alt="Person wearing a cool graphic tee looking out at the Madeiran coast"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
