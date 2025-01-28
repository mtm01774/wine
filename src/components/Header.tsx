'use client';

import Link from "next/link";
import { Wine, LogIn, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full bg-[#1A393E]/90 backdrop-blur-sm z-50 shadow-sm"
    >
      <div className="container-custom py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-4 text-primary">
              <Wine size={32} />
              <span className="font-display text-[1.25rem] font-bold text-[#ECE5D5] leading-none">Vinial</span>
            </Link>
            <ul className="hidden md:flex items-center gap-8 ml-[48px]">
              <li>
                <Link href="/" className="text-[#ECE5D5] hover:text-[#F7EC73] transition-colors duration-200 text-[0.75rem]">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/planos" className="text-[#ECE5D5] hover:text-[#F7EC73] transition-colors duration-200 text-[0.75rem]">
                  Planos
                </Link>
              </li>
              <li>
                <Link href="/loja" className="text-[#ECE5D5] hover:text-[#F7EC73] transition-colors duration-200 text-[0.75rem]">
                  Loja
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-[#ECE5D5] hover:text-[#F7EC73] transition-colors duration-200 text-[0.75rem]">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-[#ECE5D5] hover:text-[#F7EC73] transition-colors duration-200 text-[0.75rem]">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Link href="/pt" className="text-[#ECE5D5] hover:text-[#F7EC73] transition-colors duration-200 text-[0.75rem]">
                PT
              </Link>
              <span className="text-[#ECE5D5]/25">/</span>
              <Link href="/en" className="text-[#ECE5D5] hover:text-[#F7EC73] transition-colors duration-200 text-[0.75rem]">
                EN
              </Link>
            </div>
            <Link href="/login" className="text-[#ECE5D5] hover:text-[#F7EC73] transition-colors duration-200 text-[0.75rem] flex items-center gap-2 group">
              <LogIn size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              <span>Iniciar Sessão</span>
            </Link>
            <div className="relative flex items-center">
              <Link href="/carrinho" className="text-[#ECE5D5] hover:text-[#F7EC73] transition-colors duration-200 flex items-center group">
                <ShoppingCart size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                <span className="ml-1 bg-[#F7EC73] text-[#1A393E] text-[10px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center font-medium pt-0.5">
                  0
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}