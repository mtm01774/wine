'use client';

import Image from "next/image";
import { Truck, ShoppingCart } from "lucide-react";
import { useEffect, useState, useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as Tooltip from '@radix-ui/react-tooltip';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const featuredWines = [
  {
    name: "Quinta do Vale Meão",
    year: "2019",
    region: "Douro",
    type: "Tinto",
    price: "89.90",
    image: "/images/wine-1.png",
    rating: "94",
  },
  {
    name: "Pêra-Manca Tinto",
    year: "2018",
    region: "Alentejo",
    type: "Tinto",
    price: "495.00",
    image: "/images/wine-2.png",
    rating: "96",
  },
  {
    name: "Barca Velha",
    year: "2011",
    region: "Douro",
    type: "Tinto",
    price: "795.00",
    image: "/images/wine-3.png",
    rating: "98",
  },
  {
    name: "Casa Ferreirinha Reserva",
    year: "2020",
    region: "Douro",
    type: "Tinto",
    price: "24.90",
    image: "/images/wine-1.png",
    rating: "92",
  },
  {
    name: "Quinta do Crasto Reserva",
    year: "2019",
    region: "Douro",
    type: "Tinto",
    price: "32.90",
    image: "/images/wine-2.png",
    rating: "93",
  },
  {
    name: "Cartuxa Colheita",
    year: "2019",
    region: "Alentejo",
    type: "Tinto",
    price: "39.90",
    image: "/images/wine-3.png",
    rating: "91",
  },
];

export function Shop() {
  const [mounted, setMounted] = useState(false);
  const [truncatedTitles, setTruncatedTitles] = useState<{[key: string]: boolean}>({});
  const titleRefs = useRef<{[key: string]: HTMLHeadingElement | null}>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkTruncation = () => {
      const newTruncatedTitles: {[key: string]: boolean} = {};
      
      Object.entries(titleRefs.current).forEach(([key, element]) => {
        if (element) {
          newTruncatedTitles[key] = element.scrollWidth > element.clientWidth;
        }
      });
      
      setTruncatedTitles(newTruncatedTitles);
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    
    return () => window.removeEventListener('resize', checkTruncation);
  }, [mounted]);

  const setTitleRef = (element: HTMLHeadingElement | null, name: string) => {
    if (titleRefs.current) {
      titleRefs.current[name] = element;
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <section className="py-24 bg-[#010A00]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ECE5D5]">
              Vinhos em Destaque
            </h2>
            <p className="text-[#ECE5D5]/50 text-lg">
              Descubra a nossa seleção premium de vinhos portugueses.{" "}
              <a href="/loja" className="text-[#979C06] hover:underline">
                Ver loja
              </a>
            </p>
          </div>

          <div className="relative mb-8">
            <div className="px-12">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={32}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="!pb-12"
              >
                {featuredWines.map((wine) => (
                  <SwiperSlide key={wine.name}>
                    <div className="bg-[#011A01] rounded-2xl overflow-hidden shadow-lg min-h-[520px] h-full flex flex-col">
                      <div className="relative w-full aspect-square bg-[#ECE5D5] flex-shrink-0">
                        <Image
                          src={wine.image}
                          alt={wine.name}
                          fill
                          className="object-contain"
                        />
                        <div className="absolute top-2 right-2 w-9 h-9 rounded-full bg-[#979C06] flex items-center justify-center">
                          <span className="text-[#010A00] font-bold text-sm">{wine.rating}</span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          {truncatedTitles[wine.name] ? (
                            <Tooltip.Root>
                              <Tooltip.Trigger className="w-full text-left">
                                <h3 
                                  ref={(el) => setTitleRef(el, wine.name)}
                                  className="font-bold text-lg text-[#ECE5D5] truncate"
                                >
                                  {wine.name}
                                </h3>
                              </Tooltip.Trigger>
                              <Tooltip.Content
                                className="bg-[#010A00] text-[#ECE5D5] px-4 py-2 rounded-lg text-sm z-50 shadow-lg"
                                sideOffset={5}
                              >
                                {wine.name}
                                <Tooltip.Arrow className="fill-[#010A00]" />
                              </Tooltip.Content>
                            </Tooltip.Root>
                          ) : (
                            <h3 
                              ref={(el) => setTitleRef(el, wine.name)}
                              className="font-bold text-lg text-[#ECE5D5] truncate"
                            >
                              {wine.name}
                            </h3>
                          )}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-[#ECE5D5]/10 text-[#ECE5D5] text-xs px-2 py-1 rounded-full">
                              {wine.type}
                            </span>
                            <span className="bg-[#ECE5D5]/10 text-[#ECE5D5] text-xs px-2 py-1 rounded-full">
                              {wine.year}
                            </span>
                            <span className="bg-[#ECE5D5]/10 text-[#ECE5D5] text-xs px-2 py-1 rounded-full">
                              {wine.region}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[#ECE5D5] font-bold text-xl">€{wine.price}</span>
                          <button className="bg-[#993270] text-[#ECE5D5] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#993270]/90 transition-colors flex items-center gap-2">
                            <ShoppingCart size={16} />
                            Adicionar
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3">
              <Truck className="text-[#979C06]" size={20} />
              <p className="text-[#ECE5D5]/70 text-sm">
                <span className="font-bold">Entrega Express</span> - Apenas disponível para a cidade de Braga e Guimarães.{" "}
                <a href="/como-funciona" className="text-[#979C06] hover:underline">
                  Como funciona
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Tooltip.Provider>
  );
} 