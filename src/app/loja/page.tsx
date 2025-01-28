'use client';

import { PageWrapper } from "@/components/PageWrapper";
import { WineModal } from "@/components/WineModal";
import { WineType } from "@/types/wine";
import { Search, Wine, Filter, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LojaPage() {
  // Estado para filtros e modal
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("todos");
  const [selectedRegion, setSelectedRegion] = useState("todas");
  const [selectedPrice, setSelectedPrice] = useState("todos");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedWine, setSelectedWine] = useState<WineType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados mockados dos vinhos
  const wines: WineType[] = [
    {
      id: 1,
      name: "Douro Reserva Tinto",
      type: "tinto",
      region: "Douro",
      price: 29.99,
      rating: 4.5,
      image: "/images/wine-1.jpg",
      year: 2019,
      description: "Um vinho excepcional que combina tradição e modernidade. Apresenta aromas intensos de frutas vermelhas maduras, com notas de especiarias e um toque sutil de carvalho.",
      grapeVariety: "Touriga Nacional",
      body: "Médio",
      servingTemp: "16-18°C"
    },
    {
      id: 2,
      name: "Vinho Verde Alvarinho",
      type: "branco",
      region: "Minho",
      price: 19.99,
      rating: 4.2,
      image: "/images/wine-2.jpg",
      year: 2021,
      description: "Fresco e aromático, este Alvarinho apresenta notas cítricas e florais. Na boca, revela uma acidez vibrante e um final mineral refrescante.",
      grapeVariety: "Alvarinho",
      body: "Leve",
      servingTemp: "8-10°C"
    },
    // Adicione mais vinhos aqui
  ];

  // Filtrar vinhos
  const filteredWines = wines.filter(wine => {
    const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "todos" || wine.type === selectedType;
    const matchesRegion = selectedRegion === "todas" || wine.region === selectedRegion;
    const matchesPrice = selectedPrice === "todos" || 
      (selectedPrice === "0-20" && wine.price <= 20) ||
      (selectedPrice === "20-50" && wine.price > 20 && wine.price <= 50) ||
      (selectedPrice === "50+" && wine.price > 50);
    const matchesRating = wine.rating >= selectedRating;

    return matchesSearch && matchesType && matchesRegion && matchesPrice && matchesRating;
  });

  // Função para abrir o modal
  const handleWineClick = (wine: WineType) => {
    setSelectedWine(wine);
    setIsModalOpen(true);
  };

  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          {/* Cabeçalho */}
          <div className="flex items-center gap-4 mb-12">
            <Wine size={32} className="text-primary" />
            <h1 className="font-display text-3xl md:text-4xl text-text-primary">Nossa Adega</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar de Filtros */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter size={20} className="text-primary" />
                  <h2 className="font-display text-xl text-text-primary">Filtros</h2>
                </div>

                {/* Barra de Pesquisa */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Pesquisar vinhos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Filtro por Tipo */}
                <div className="mb-6">
                  <h3 className="font-medium text-text-primary mb-3">Tipo</h3>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="todos">Todos</option>
                    <option value="tinto">Tinto</option>
                    <option value="branco">Branco</option>
                    <option value="rose">Rosé</option>
                    <option value="espumante">Espumante</option>
                  </select>
                </div>

                {/* Filtro por Região */}
                <div className="mb-6">
                  <h3 className="font-medium text-text-primary mb-3">Região</h3>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="todas">Todas</option>
                    <option value="Douro">Douro</option>
                    <option value="Alentejo">Alentejo</option>
                    <option value="Minho">Minho</option>
                    <option value="Dão">Dão</option>
                  </select>
                </div>

                {/* Filtro por Preço */}
                <div className="mb-6">
                  <h3 className="font-medium text-text-primary mb-3">Preço</h3>
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="todos">Todos</option>
                    <option value="0-20">Até €20</option>
                    <option value="20-50">€20 - €50</option>
                    <option value="50+">Mais de €50</option>
                  </select>
                </div>

                {/* Filtro por Avaliação */}
                <div>
                  <h3 className="font-medium text-text-primary mb-3">Avaliação Mínima</h3>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                          selectedRating === rating ? 'bg-primary text-text-primary' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de Produtos */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredWines.map((wine) => (
                  <div
                    key={wine.id}
                    className="bg-white rounded-lg overflow-hidden group cursor-pointer"
                    onClick={() => handleWineClick(wine)}
                  >
                    <div className="relative h-[300px]">
                      <Image
                        src={wine.image}
                        alt={wine.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text-secondary">{wine.type} • {wine.year}</span>
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-primary fill-primary" />
                          <span className="text-sm text-text-secondary">{wine.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-display text-lg text-text-primary mb-1">{wine.name}</h3>
                      <p className="text-text-secondary text-sm mb-4">{wine.region}, Portugal</p>
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary font-medium">€{wine.price.toFixed(2)}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Adicionar ao carrinho
                          }}
                          className="bg-primary text-text-primary px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors duration-200"
                        >
                          <ShoppingCart size={18} />
                          <span>Adicionar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Detalhes do Vinho */}
      {selectedWine && (
        <WineModal
          wine={selectedWine}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </PageWrapper>
  );
} 