'use client';

import { useTranslations } from 'next-intl';
import { Check, ArrowRight } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const planKeys = ['semestral', 'mensal', 'anual'] as const;

// Define the features for each plan based on what's in the translation files
const planFeatures = {
  semestral: ['bottles', 'tastingNotes', 'newsletter', 'discountClub', 'discount', 'welcome'],
  mensal: ['bottles', 'tastingNotes', 'newsletter', 'discountClub'],
  anual: ['bottles', 'tastingNotes', 'newsletter', 'discountClub', 'discount', 'welcome', 'glass'],
} as const;

type PlanKey = typeof planKeys[number];
type FeatureKey = typeof planFeatures[PlanKey][number];

export function Plans() {
  const t = useTranslations('Products');

  const renderFeature = (planKey: PlanKey, featureKey: FeatureKey) => {
    try {
      const translation = t(`plans.${planKey}.features.${featureKey}`);
      return (
        <li key={featureKey} className="text-base flex items-start gap-2">
          <span className="text-primary mt-1">✓</span>
          <span className="text-[#ECE5D5]/80">{translation}</span>
        </li>
      );
    } catch {
      return null;
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24 bg-[#1A393E]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <m.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#ECE5D5] text-3xl font-bold mb-4"
            >
              {t('title')}
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#ECE5D5]/80"
            >
              {t('description')}
            </m.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {planKeys.map((planKey, index) => {
              const isHighlight = planKey === 'mensal';
              const features = planFeatures[planKey];
              
              return (
                <m.div
                  key={planKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={`bg-[#0D1C1F] rounded-2xl p-8 shadow-lg text-[#ECE5D5] flex flex-col ${
                    isHighlight ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="text-h2 font-bold mb-4">
                      {t(`plans.${planKey}.title`)}
                    </h3>
                    <div className="flex items-baseline mb-8">
                      <span className="text-display font-bold">{t(`plans.${planKey}.price`)}</span>
                      <span className="text-[#ECE5D5]/60 text-small ml-2">{t(`plans.${planKey}.period`)}</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {features.map(featureKey => renderFeature(planKey, featureKey))}
                    </ul>
                  </div>
                  <div>
                    <button
                      className="w-full btn-primary text-button flex items-center justify-between group"
                    >
                      <span>{t('subscribe')}</span>
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}