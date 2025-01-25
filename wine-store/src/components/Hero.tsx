import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="container-custom relative z-10 pt-24">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Descubra o prazer de receber os melhores vinhos em casa
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Curadoria especializada, vinhos premium selecionados e uma experiência única de degustação. Assine agora e receba em casa.
          </p>
          <div>
            <Link href="/planos" className="btn-primary text-lg">
              Conheça nossos planos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 