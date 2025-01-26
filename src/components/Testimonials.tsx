import { Star } from "lucide-react";
import Image from "next/image";

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
      return <Star key={index} className="text-[#979C06] fill-[#979C06]" size={16} />;
    } else if (index === Math.floor(rating) && rating % 1 !== 0) {
      return (
        <div key={index} className="relative">
          <Star className="text-[#979C06]" size={16} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="text-[#979C06] fill-[#979C06]" size={16} />
          </div>
        </div>
      );
    } else {
      return <Star key={index} className="text-[#979C06]" size={16} />;
    }
  };

  return (
    <section className="py-24 bg-[#010A00]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ECE5D5]">
            O que os nossos clientes dizem
          </h2>
          <p className="text-[#ECE5D5]/50 text-lg">
            Experiências reais dos membros do nosso clube
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-[#011A01] rounded-2xl p-8 shadow-lg pt-16 relative"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#011A01]">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-[#ECE5D5] mb-1">{testimonial.name}</h3>
                <p className="text-[#ECE5D5]/50 text-sm mb-4">{testimonial.role}</p>
                <div className="flex gap-0.5 justify-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => renderStar(i, testimonial.rating))}
                </div>
                <p className="text-[#ECE5D5]/90">
                  <span className="text-[#979C06] text-2xl font-bold">"</span>
                  {testimonial.content}
                  <span className="text-[#979C06] text-2xl font-bold">"</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}