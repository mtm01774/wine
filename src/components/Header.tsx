import Link from "next/link";
import { Wine, LogIn } from "lucide-react";

export function Header() {
  return (
    <header className="fixed w-full bg-[#010F00]/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container-custom py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-8 text-primary">
            <Wine size={32} />
            <span className="font-display text-[1.25rem] font-bold text-[#ECE5D5] leading-none">Wine Store</span>
          </Link>

          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link href="/" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200 text-[0.75rem]">
                Início
              </Link>
            </li>
            <li>
              <Link href="/planos" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200 text-[0.75rem]">
                Planos
              </Link>
            </li>
            <li>
              <Link href="/loja" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200 text-[0.75rem]">
                Loja
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200 text-[0.75rem]">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/contato" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200 text-[0.75rem]">
                Contacto
              </Link>
            </li>
          </ul>

          <div className="flex items-center">
            <Link href="/login" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200 text-[0.75rem] flex items-center gap-2">
              <LogIn size={16} />
              <span>Iniciar Sessão</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}