import { Check } from "lucide-react";

const plans = [
  {
    title: "Semestral",
    price: "€ 179",
    period: "/mês",
    features: [
      "2 garrafas premium por mês",
      "Fichas de prova",
      "Newsletter exclusiva",
      "Acesso ao clube de descontos",
      "10% de desconto",
      "Presente de boas-vindas",
    ],
    highlight: false,
  },
  {
    title: "Mensal",
    price: "€ 199",
    period: "/mês",
    features: [
      "2 garrafas premium por mês",
      "Fichas de prova",
      "Newsletter exclusiva",
      "Acesso ao clube de descontos",
    ],
    highlight: true,
  },
  {
    title: "Anual",
    price: "€ 159",
    period: "/mês",
    features: [
      "2 garrafas premium por mês",
      "Fichas de prova",
      "Newsletter exclusiva",
      "Acesso ao clube de descontos",
      "20% de desconto",
      "Presente de boas-vindas",
      "Copo exclusivo do clube",
    ],
    highlight: false,
  },
];

export function Plans() {
  return (
    <section className="py-24 bg-[#010A00]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ECE5D5]">
            Escolha o plano perfeito para si
          </h2>
          <p className="text-[#ECE5D5]/50 text-lg">
            Subscreva agora e comece a sua jornada no mundo dos vinhos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="bg-[#ECE5D5] rounded-2xl p-8 pb-0 shadow-lg text-[#010A00] flex flex-col"
            >
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold mb-4">
                  {plan.title}
                </h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-[#010A00]/70 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="text-primary" size={20} />
                      <span className="text-[#010A00]/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pb-8">
                <button
                  className="w-full bg-[#010A00] text-[#ECE5D5] font-semibold py-2 px-6 rounded-full transition-colors duration-200 hover:bg-[#010A00]/90"
                >
                  Subscrever
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}