import { PageWrapper } from "@/components/PageWrapper";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContatoPage() {
  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-text-primary mb-4">Entre em Contato</h1>
            <p className="text-text-secondary">
              Tem alguma dúvida ou sugestão? Estamos aqui para ajudar. Entre em contato conosco através do formulário abaixo ou utilize nossos canais de atendimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-xl text-text-primary mb-2">Telefone</h3>
              <p className="text-text-secondary">+351 123 456 789</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-xl text-text-primary mb-2">Email</h3>
              <p className="text-text-secondary">contato@vinial.pt</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-xl text-text-primary mb-2">Endereço</h3>
              <p className="text-text-secondary">Rua do Vinho, 123<br />Lisboa, Portugal</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <form className="bg-white p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="nome" className="block text-text-primary text-sm mb-2">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-text-primary text-sm mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="assunto" className="block text-text-primary text-sm mb-2">Assunto</label>
                <input
                  type="text"
                  id="assunto"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Assunto da mensagem"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="mensagem" className="block text-text-primary text-sm mb-2">Mensagem</label>
                <textarea
                  id="mensagem"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Sua mensagem"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-text-primary font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
} 