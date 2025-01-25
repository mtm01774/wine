import React, { useState } from 'react';

interface WinePreferences {
  types: string[];
  priceRange: { min: number; max: number };
  surpriseMe: boolean;
}

export const WinePreferencesWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<WinePreferences>({
    types: [],
    priceRange: { min: 0, max: 100 },
    surpriseMe: false
  });

  const handleWineTypeSelection = (types: string[]) => {
    setPreferences(prev => ({ ...prev, types }));
    setStep(2);
  };

  const handlePriceRange = (range: { min: number; max: number }) => {
    setPreferences(prev => ({ ...prev, priceRange: range }));
    setStep(3);
  };

  const handleSurpriseMe = (surprise: boolean) => {
    setPreferences(prev => ({ ...prev, surpriseMe: surprise }));
    // Finalizar wizard e salvar preferências
  };

  const wineTypes = ['Tinto', 'Branco', 'Rosé', 'Espumante'];
  const priceRanges = [
    { min: 0, max: 50, label: 'Até €50' },
    { min: 50, max: 100, label: '€50 - €100' },
    { min: 100, max: 200, label: '€100 - €200' }
  ];

  return (
    <div className="wine-preferences-wizard">
      {step === 1 && (
        <div>
          <h2>Selecione seus tipos de vinho preferidos</h2>
          {wineTypes.map(type => (
            <button key={type} onClick={() => handleWineTypeSelection([type])}>
              {type}
            </button>
          ))}
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h2>Selecione sua faixa de preço</h2>
          {priceRanges.map(range => (
            <button key={range.label} onClick={() => handlePriceRange(range)}>
              {range.label}
            </button>
          ))}
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2>Deseja receber vinhos surpresa?</h2>
          <button onClick={() => handleSurpriseMe(true)}>
            Sim, surpreenda-me!
          </button>
          <button onClick={() => handleSurpriseMe(false)}>
            Não, prefiro escolher
          </button>
        </div>
      )}
    </div>
  );
}; 