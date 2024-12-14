'use client';
import { MovieCard } from '@/app/components/movie-card';
import { SearchSteps } from '@/app/components/search-steps';
import { useState } from 'react';

export default function Page() {
  const [displayResults, setDisplayResults] = useState(true);

  return (
    <main className="h-full w-full flex flex-col p-4 md:pl-12 md:pr-12 gap-12">
      {displayResults ? (
        <div className="grid md:grid-cols-2 gap-8">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      ) : (
        <section className="pt-6">
          <SearchSteps setDisplayResults={setDisplayResults} />
        </section>
      )}
    </main>
  );
}
