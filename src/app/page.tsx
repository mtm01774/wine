import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Plans } from "@/components/Plans";
import { Shop } from "@/components/Shop";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main className="smooth-scroll h-screen overflow-y-auto">
        <div>
          <Hero />
        </div>
        <div>
          <Shop />
        </div>
        <div>
          <Plans />
        </div>
        <div>
          <Testimonials />
        </div>
      </main>
    </>
  );
}
