import { PageWrapper } from "@/components/PageWrapper";
import { Wine } from "lucide-react";
import Image from "next/image";

export default function SobrePage() {
  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Wine size={32} className="text-primary" />
                <h1 className="font-display text-3xl md:text-4xl text-text-primary">Sobre a Vinial</h1>
              </div>
              <p className="text-text-secondary mb-6">
                A Vinial nasceu da paixão pelo vinho e da vontade de tornar a experiência de degustação mais acessível e prazerosa para todos.
              </p>
              <p className="text-text-secondary mb-6">
                Fundada em 2024, nossa missão é conectar apreciadores de vinho com as melhores vinícolas de Portugal, oferecendo uma curadoria especial de rótulos exclusivos.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <h3 className="font-display text-2xl text-primary mb-2">500+</h3>
                  <p className="text-text-secondary text-sm">Vinhos Selecionados</p>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-2xl text-primary mb-2">50+</h3>
                  <p className="text-text-secondary text-sm">Vinícolas Parceiras</p>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-2xl text-primary mb-2">10k+</h3>
                  <p className="text-text-secondary text-sm">Clientes Felizes</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/about-wine.jpg"
                alt="Vinícola"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-custom">
          <h2 className="font-display text-2xl md:text-3xl text-text-primary text-center mb-12">Nossa História</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-display text-xl text-text-primary mb-4">Origem</h3>
              <p className="text-text-secondary">
                Começamos como um pequeno clube de vinhos entre amigos, compartilhando descobertas e experiências únicas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-display text-xl text-text-primary mb-4">Crescimento</h3>
              <p className="text-text-secondary">
                Expandimos nossa rede de parceiros e desenvolvemos uma plataforma moderna para atender mais amantes de vinho.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-display text-xl text-text-primary mb-4">Hoje</h3>
              <p className="text-text-secondary">
                Somos referência em clube de vinhos em Portugal, com uma comunidade ativa e apaixonada.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
} 