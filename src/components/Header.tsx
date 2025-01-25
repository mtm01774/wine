import Link from "next/link";
import { Wine } from "lucide-react";

export function Header() {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container-custom py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Wine size={32} />
            <span className="font-playfair text-xl font-bold">Wine Store</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link href="/" className="nav-link">
                Início
              </Link>
            </li>
            <li>
              <Link href="/planos" className="nav-link">
                Planos
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="nav-link">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/contato" className="nav-link">
                Contato
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Link href="/login" className="btn-secondary">
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