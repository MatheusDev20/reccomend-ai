'use client';
import { SearchSteps } from '@/app/components/search-steps';

export default function Page() {
  return (
    <main className="h-full w-full flex flex-col pl-12 pr-12 gap-12">
      {/* Search Parameters Area */}

      <section className="pt-6">
        <SearchSteps />
      </section>
    </main>
  );
}
