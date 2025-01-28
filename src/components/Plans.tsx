'use client';

import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-24 bg-[#1A393E]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-h1 font-bold mb-6 text-[#ECE5D5]"
          >
            Nossos Planos
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-large text-[#ECE5D5]/90 max-w-2xl mx-auto"
          >
            Escolha o plano que melhor se adapta ao seu perfil e comece a receber vinhos exclusivos em sua casa.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`bg-[#0D1C1F] rounded-2xl p-8 shadow-lg text-[#ECE5D5] flex flex-col ${
                plan.highlight ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex-1">
                <h3 className="text-h2 font-bold mb-4">
                  {plan.title}
                </h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-display font-bold">{plan.price}</span>
                  <span className="text-[#ECE5D5]/60 text-small ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-base flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-[#ECE5D5]/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button
                  className="w-full btn-primary text-button flex items-center justify-between group"
                >
                  <span>Subscrever</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}