'use client';
import { usePrompt } from '@/app/api/prompt/query';
import { MovieCard } from '@/app/components/movie-card';
import { SearchSteps } from '@/app/components/search-steps';
import { useStepperForm } from '@/app/context/stepper-context';
import { useState } from 'react';

export default function Page() {
  const [displayResults, setDisplayResults] = useState(false);
  const { data } = useStepperForm();

  const { refetch, data: promptResponse } = usePrompt({
    ...data,
    type: 'movies',
  });

  const handleSearchPrompt = async () => {
    await refetch();
    setDisplayResults(true);
  };

  return (
    <main className="h-full w-full flex flex-col p-4 md:pl-12 md:pr-12 gap-12">
      {displayResults ? (
        <div className="flex flex-col md:gap-8">
          <h3 className="self-center">
            Melhores recomendações baseadas na sua pesquisa
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {promptResponse?.map((movie: any) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </div>
        </div>
      ) : (
        <section className="pt-6">
          <SearchSteps search={handleSearchPrompt} />
        </section>
      )}
    </main>
  );
}
