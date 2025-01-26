import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Wine } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#222222] text-[#ECE5D5] py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo e Sobre */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Wine size={32} className="text-primary" />
              <span className="font-playfair text-xl font-bold text-[#ECE5D5]">Wine Store</span>
            </Link>
            <p className="text-[#ECE5D5]/70">
              Sua experiência premium em vinhos, entregue diretamente em sua casa.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="font-bold text-lg mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-[#ECE5D5]/70 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/planos" className="text-[#ECE5D5]/70 hover:text-primary transition-colors">
                  Nossos Planos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#ECE5D5]/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#ECE5D5]/70 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-[#ECE5D5]/70">
                <Phone size={20} className="text-primary" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-[#ECE5D5]/70">
                <Mail size={20} className="text-primary" />
                <span>contato@winestore.com.br</span>
              </li>
              <li className="flex items-center gap-2 text-[#ECE5D5]/70">
                <MapPin size={20} className="text-primary" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-bold text-lg mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-primary transition-colors text-[#ECE5D5]"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-primary transition-colors text-[#ECE5D5]"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-primary transition-colors text-[#ECE5D5]"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#333333] mt-12 pt-8 text-center text-[#ECE5D5]/70">
          <p>© 2024 Wine Store. Todos os direitos reservados.</p>
          <div className="mt-4 space-x-4">
            <Link href="/privacidade" className="hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}