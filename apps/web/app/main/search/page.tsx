'use client';
import { SearchSteps } from '@/app/components/search-steps';

export default function Page() {
  return (
    <main className="h-full w-full flex flex-col p-4 md:pl-12 md:pr-12 gap-12">
      {/* Search Parameters Area */}

      <section className="pt-6">
        <SearchSteps />
      </section>
    </main>
  );
}
