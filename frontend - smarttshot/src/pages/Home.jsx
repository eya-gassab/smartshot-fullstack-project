import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-beige-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-500">
      <Navbar/>
      <Hero />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
}
