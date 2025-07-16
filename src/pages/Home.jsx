import BackToTop from "../components/BackToTop";
import CardsDisplay from "../components/CarDisplay";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Reviews from "../components/Reviews";
import WhyUs from "../components/WhyUs";

const Home = () => {
  return (
    <main className="w-full">
      <Hero />
      <HowItWorks />
      <CardsDisplay />
      <WhyUs />
      <Reviews />
      <FAQ />
      <BackToTop />
      <Footer />
    </main>
  );
};

export default Home;
