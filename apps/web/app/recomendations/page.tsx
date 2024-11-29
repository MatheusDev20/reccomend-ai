'use client';
import MediaPlayer from '@/public/media-player-p.png';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="h-full w-full flex flex-col pl-12 pr-12">
      <section className="flex md:flex-row">
        {/* Left Column */}
        <div className="md:w-1/2 sm:w-full min-h-full flex flex-col items-center pt-6 md:pt-16">
          <h1 className="mt-10 md:text-4xl font-bold tracking-tight text-sm text-gray-900">
            Receba as melhores recomendações utilizando{' '}
            <span className="text-[#6C63FF]">Inteligência Artificial</span>
          </h1>
          <p className="items-start mt-8 text-sm md:text-md font-semibold leading-8 text-gray-600">
            Descubra filmes, músicas e curiosidades incríveis através de uma
            experiência intuitiva e conversacional. Peça recomendações e deixe a
            tecnologia fazer o resto.
          </p>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 h-full bg-center hidden md:flex">
          <Image
            src={MediaPlayer}
            alt="Media Player"
            className="object-cover"
          />
        </div>
      </section>
      <h1>Another section</h1>
    </main>
  );
}
