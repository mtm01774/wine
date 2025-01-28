import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Wine } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1A393E] py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h4 className="text-h3 font-bold mb-6">Sobre Nós</h4>
            <p className="text-base text-[#ECE5D5]/80 mb-6">
              Somos apaixonados por vinhos e queremos compartilhar essa paixão com você através de seleções exclusivas e experiências únicas.
            </p>
          </div>

          <div>
            <h4 className="text-h3 font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/planos" className="text-base text-[#ECE5D5]/80 hover:text-primary transition-colors duration-200">
                  Planos
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-base text-[#ECE5D5]/80 hover:text-primary transition-colors duration-200">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-base text-[#ECE5D5]/80 hover:text-primary transition-colors duration-200">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-h3 font-bold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="text-base text-[#ECE5D5]/80">
                contato@wineclub.com
              </li>
              <li className="text-base text-[#ECE5D5]/80">
                +55 (11) 99999-9999
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-h3 font-bold mb-6">Newsletter</h4>
            <p className="text-base text-[#ECE5D5]/80 mb-4">
              Receba novidades e ofertas exclusivas.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="bg-[#ECE5D5]/10 text-[#ECE5D5] text-base px-4 py-2 rounded-lg flex-1"
              />
              <button type="submit" className="btn-primary text-button">
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#ECE5D5]/10 mt-12 pt-8">
          <p className="text-small text-[#ECE5D5]/60 text-center">
            © 2024 Wine Club. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}