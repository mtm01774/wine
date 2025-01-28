import { PageWrapper } from "@/components/PageWrapper";
import { Plans } from "@/components/Plans";
import { Wine } from "lucide-react";

export default function PlanosPage() {
  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Wine size={32} className="text-primary" />
              <h1 className="font-display text-3xl md:text-4xl text-text-primary">Nossos Planos</h1>
            </div>
            <p className="text-text-secondary">
              Escolha o plano ideal para sua jornada no mundo dos vinhos. Cada plano foi cuidadosamente elaborado para proporcionar uma experiência única de degustação.
            </p>
          </div>
        </div>
        <Plans />
      </section>
    </PageWrapper>
  );
} 