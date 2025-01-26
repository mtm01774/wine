import { Check } from "lucide-react";

const plans = [
  {
    title: "Mensal",
    price: "R$ 199",
    period: "/mês",
    features: [
      "2 garrafas premium por mês",
      "Fichas de degustação",
      "Newsletter exclusiva",
      "Acesso ao clube de descontos",
    ],
    highlight: false,
  },
  {
    title: "Semestral",
    price: "R$ 179",
    period: "/mês",
    features: [
      "2 garrafas premium por mês",
      "Fichas de degustação",
      "Newsletter exclusiva",
      "Acesso ao clube de descontos",
      "10% de desconto",
      "Presente de boas-vindas",
    ],
    highlight: true,
  },
  {
    title: "Anual",
    price: "R$ 159",
    period: "/mês",
    features: [
      "2 garrafas premium por mês",
      "Fichas de degustação",
      "Newsletter exclusiva",
      "Acesso ao clube de descontos",
      "20% de desconto",
      "Presente de boas-vindas",
      "Taça exclusiva do clube",
    ],
    highlight: false,
  },
];

export function Plans() {
  return (
    <section className="py-24 bg-[#222222]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ECE5D5]">
            Escolha o plano perfeito para você
          </h2>
          <p className="text-text-secondary text-lg">
            Assine agora e comece sua jornada no mundo dos vinhos
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
              <h3 className="font-playfair text-2xl font-bold mb-4">
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
                Assinar agora
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}