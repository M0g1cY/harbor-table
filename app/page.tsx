import HeroSection from '@/components/hero/HeroSection';
import PhilosophySection from '@/components/philosophy/PhilosophySection';
import MenuSection from '@/components/menu/MenuSection';
import ReservationSection from '@/components/reservation/ReservationSection';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PhilosophySection />
      <MenuSection />
      <ReservationSection />
      <Footer />
    </main>
  );
}
