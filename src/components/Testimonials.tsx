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
    rating: 5,
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
  return (
    <section className="py-24 bg-[#010F00]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ECE5D5]">
            O que os nossos clientes dizem
          </h2>
          <p className="text-text-secondary text-lg">
            Experiências reais dos membros do nosso clube
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-[#333333] rounded-2xl p-8 shadow-lg"
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
                  <h3 className="font-bold text-lg text-[#ECE5D5]">{testimonial.name}</h3>
                  <p className="text-text-secondary">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-yellow-400"
                    size={20}
                  />
                ))}
              </div>
              <p className="text-[#ECE5D5]/90">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}