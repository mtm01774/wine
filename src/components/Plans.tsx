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
    <section className="py-24 bg-[#010F00]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ECE5D5]">
            Escolha o plano perfeito para si
          </h2>
          <p className="text-text-secondary text-lg">
            Subscreva agora e comece a sua jornada no mundo dos vinhos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`bg-[#333333] rounded-2xl p-8 shadow-lg text-[#ECE5D5] ${
                plan.highlight
                  ? "ring-2 ring-primary scale-105 md:scale-110"
                  : ""
              }`}
            >
              <h3 className="font-display text-2xl font-bold mb-4">
                {plan.title}
              </h3>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-text-secondary ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="text-primary" size={20} />
                    <span className="text-[#ECE5D5]/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full ${
                  plan.highlight ? "btn-primary" : "btn-secondary"
                }`}
              >
                Subscrever agora
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}