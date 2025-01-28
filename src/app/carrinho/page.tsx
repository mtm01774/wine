import { PageWrapper } from "@/components/PageWrapper";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CarrinhoPage() {
  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-8">
            <ShoppingCart size={32} className="text-primary" />
            <h1 className="font-display text-3xl text-text-primary">Seu Carrinho</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Item do carrinho */}
              <div className="bg-white p-6 rounded-lg mb-4">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/wine-1.jpg"
                      alt="Vinho Tinto"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-display text-lg text-text-primary mb-1">Vinho Tinto Reserva</h3>
                    <p className="text-text-secondary text-sm mb-4">Douro, Portugal</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                          <Minus size={16} className="text-text-secondary" />
                        </button>
                        <span className="text-text-primary">1</span>
                        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                          <Plus size={16} className="text-text-secondary" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-text-primary font-medium">€49.99</span>
                        <button className="text-red-500 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outro item do carrinho */}
              <div className="bg-white p-6 rounded-lg mb-4">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/wine-2.jpg"
                      alt="Vinho Branco"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-display text-lg text-text-primary mb-1">Vinho Branco Verde</h3>
                    <p className="text-text-secondary text-sm mb-4">Minho, Portugal</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                          <Minus size={16} className="text-text-secondary" />
                        </button>
                        <span className="text-text-primary">2</span>
                        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                          <Plus size={16} className="text-text-secondary" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-text-primary font-medium">€35.99</span>
                        <button className="text-red-500 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg sticky top-24">
                <h2 className="font-display text-xl text-text-primary mb-6">Resumo do Pedido</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span>€121.97</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Entrega</span>
                    <span>€5.00</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-text-primary font-medium">
                      <span>Total</span>
                      <span>€126.97</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-primary text-text-primary font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  Finalizar Compra
                </button>
                <Link
                  href="/loja"
                  className="block text-center text-primary text-sm mt-4 hover:underline"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
} 