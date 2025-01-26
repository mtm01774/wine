import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="min-h-screen bg-[#010F00] pt-[72px]">
      <div className="container-custom h-[calc(100vh-72px)]">
        <div className="grid md:grid-cols-2 gap-8 h-full">
          <div className="relative h-[calc(100vh-72px)]">
            <div className="sticky top-[72px] h-full flex items-center">
              <div className="text-[#ECE5D5] px-16">
                <h1 className="text-[2.25rem] md:text-[3.75rem] font-bold mb-6 font-display leading-[1.05]">
                  Relaxe,<br />
                  do vinho tratamos nós!
                </h1>
                <p className="text-[1.125rem] md:text-[1.25rem] mb-16 text-[#ECE5D5]/90">
                  Vinhos excepcionais, pouco conhecidos. Receba-os em sua casa.
                </p>
                <div>
                  <Link href="/planos" className="btn-primary text-[1rem] py-4 px-10">
                    Conhecer planos
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[calc(100vh-72px)] flex items-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/man-drinking-wine.jpg"
                alt="Homem apreciando vinho"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}