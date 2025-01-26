import Link from "next/link";
import { Wine } from "lucide-react";

export function Header() {
  return (
    <header className="fixed w-full bg-[#222222]/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container-custom py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Wine size={32} />
            <span className="font-playfair text-xl font-bold text-[#ECE5D5]">Wine Store</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link href="/" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200">
                Início
              </Link>
            </li>
            <li>
              <Link href="/planos" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200">
                Planos
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/contato" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200">
                Contato
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[#ECE5D5] border-2 border-primary hover:bg-primary transition-colors duration-200 font-semibold py-2 px-6 rounded-full">
              Entrar
            </Link>
            <Link href="/cadastro" className="btn-primary hidden md:block">
              Cadastrar
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}