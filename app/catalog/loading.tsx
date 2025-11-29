import { Card } from '@/components/ui/card';

export default function LoadingHome() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Catalog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}
