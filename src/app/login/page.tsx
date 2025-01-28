import { PageWrapper } from "@/components/PageWrapper";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="text-primary" size={24} />
              </div>
              <h1 className="font-display text-3xl text-text-primary mb-2">Bem-vindo de volta</h1>
              <p className="text-text-secondary">
                Entre na sua conta para acessar seus pedidos e preferências
              </p>
            </div>

            <form className="bg-white p-8 rounded-lg">
              <div className="mb-6">
                <label htmlFor="email" className="block text-text-primary text-sm mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="senha" className="text-text-primary text-sm">Senha</label>
                  <Link href="/recuperar-senha" className="text-primary text-sm hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <input
                  type="password"
                  id="senha"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="lembrar"
                  className="w-4 h-4 border-gray-200 rounded text-primary focus:ring-primary"
                />
                <label htmlFor="lembrar" className="ml-2 text-text-secondary text-sm">
                  Lembrar de mim
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-text-primary font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 mb-4"
              >
                Entrar
              </button>
              <p className="text-center text-text-secondary text-sm">
                Ainda não tem uma conta?{" "}
                <Link href="/cadastro" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-text-secondary">Ou continue com</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-white transition-colors duration-200">
                  <img src="/images/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                  <span className="text-text-primary text-sm">Google</span>
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-white transition-colors duration-200">
                  <img src="/images/facebook.svg" alt="Facebook" className="w-5 h-5 mr-2" />
                  <span className="text-text-primary text-sm">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
} 