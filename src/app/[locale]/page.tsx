import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col mx-auto max-w-7xl">
      <Hero />
      <About />
      <Services />
      <Contact />
    </div>
  );
}
