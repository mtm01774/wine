'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export function Hero() {
  const isTouch = useIsTouchDevice();

  const MotionWrapper = isTouch ? 'div' : motion.div;

  return (
    <section className="min-h-screen bg-[#1A393E] pt-[96px]">
      <div className="container-custom h-[calc(100vh-96px)]">
        <div className="grid md:grid-cols-2 gap-8 h-full">
          <div className="relative h-[calc(100vh-96px)] flex order-2 md:order-1">
            <div className="sticky top-[96px] flex flex-col justify-between h-full w-full">
              <div className="text-[#ECE5D5] px-4 md:px-16 pt-3">
                <MotionWrapper 
                  initial={!isTouch ? { opacity: 0, y: 20 } : undefined}
                  animate={!isTouch ? { opacity: 1, y: 0 } : undefined}
                  transition={!isTouch ? { duration: 0.6 } : undefined}
                >
                  <h1 className="text-display font-bold mb-6 font-display leading-[1.05] uppercase">
                    <span className="block">Desfrute,</span>
                    <span className="block pl-4 md:pl-12">do vinho tratamos nós!</span>
                  </h1>
                </MotionWrapper>

                <MotionWrapper
                  initial={!isTouch ? { opacity: 0, y: 20 } : undefined}
                  animate={!isTouch ? { opacity: 1, y: 0 } : undefined}
                  transition={!isTouch ? { duration: 0.6, delay: 0.2 } : undefined}
                >
                  <p className="text-large mb-8 md:mb-16 text-[#ECE5D5]/90 pl-4 md:pl-12">
                    Vinhos excepcionais, pouco conhecidos. Receba-os em sua casa.
                  </p>
                </MotionWrapper>
              </div>

              <MotionWrapper
                initial={!isTouch ? { opacity: 0, y: 20 } : undefined}
                animate={!isTouch ? { opacity: 1, y: 0 } : undefined}
                transition={!isTouch ? { duration: 0.6, delay: 0.4 } : undefined}
                className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 px-4 md:px-16 pl-8 md:pl-28 mb-[28px]"
              >
                <Link href="/planos" className="btn-primary text-button py-2.5 px-4 md:px-6 w-full sm:w-auto text-center whitespace-nowrap">
                  Conhecer planos
                </Link>
                <Link href="/como-funciona" className="text-[#ECE5D5] hover:text-primary transition-colors duration-200 text-button whitespace-nowrap">
                  Como Funciona
                </Link>
              </MotionWrapper>
            </div>
          </div>

          <MotionWrapper 
            initial={!isTouch ? { opacity: 0, scale: 0.95 } : undefined}
            animate={!isTouch ? { opacity: 1, scale: 1 } : undefined}
            transition={!isTouch ? { duration: 0.8 } : undefined}
            className="relative h-[50vh] md:h-[calc(100vh-96px)] flex items-center justify-center order-1 md:order-2"
          >
            <div className="relative w-[90%] sm:w-[80%] max-w-[480px] aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/hero-img.jpg"
                alt="Homem apreciando vinho"
                fill
                className="object-cover"
                priority
              />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}