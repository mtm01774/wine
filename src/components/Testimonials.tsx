'use client';

import { Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ana Silva",
    role: "Sommelière",
    image: "/images/testimonial-1.jpg",
    content:
      "Incrível seleção de vinhos! A curadoria é excecional e cada garrafa é uma nova descoberta. Recomendo muito!",
    rating: 5,
  },
  {
    name: "Carlos Santos",
    role: "Entusiasta",
    image: "/images/testimonial-2.jpg",
    content:
      "O clube superou as minhas expectativas. As fichas de prova são muito informativas e ajudam a aprender mais sobre vinhos.",
    rating: 4.5,
  },
  {
    name: "Marina Costa",
    role: "Chef de Cozinha",
    image: "/images/testimonial-3.jpg",
    content:
      "Ótima relação qualidade-preço e vinhos de excelente qualidade. O apoio ao cliente é impecável!",
    rating: 5,
  },
];

export function Testimonials() {
  const renderStar = (index: number, rating: number) => {
    if (index < Math.floor(rating)) {
      return <Star key={index} className="text-[#F7EC73] fill-[#F7EC73]" size={16} />;
    } else if (index === Math.floor(rating) && rating % 1 !== 0) {
      return (
        <div key={index} className="relative">
          <Star className="text-[#F7EC73]" size={16} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="text-[#F7EC73] fill-[#F7EC73]" size={16} />
          </div>
        </div>
      );
    } else {
      return <Star key={index} className="text-[#F7EC73]" size={16} />;
    }
  };

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
            O que dizem nossos clientes
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-large text-[#ECE5D5]/90 max-w-2xl mx-auto"
          >
            Descubra por que nossos clientes amam nossa seleção de vinhos e serviço personalizado.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-[#0D1C1F] rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-h3 font-bold text-[#ECE5D5]">{testimonial.name}</h3>
                  <p className="text-small text-[#ECE5D5]/60">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 justify-start mb-4">
                {Array.from({ length: 5 }).map((_, i) => renderStar(i, testimonial.rating))}
              </div>
              <p className="text-base text-[#ECE5D5]/80">
                <span className="text-primary text-large font-bold">"</span>
                {testimonial.content}
                <span className="text-primary text-large font-bold">"</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}