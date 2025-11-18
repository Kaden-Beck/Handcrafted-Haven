import Hero from '@/components/ui/hero';

export default function Home() {
  return (
    <section>
      <h1 className="text-2xl text-center">Home</h1>
      <Hero src="/lorem.jpg" alt="Handcrafted decor hero" />
    </section>
  );
}
