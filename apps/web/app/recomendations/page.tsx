'use client';
import MediaPlayer from '@/public/media-player-p.png';
import Image from 'next/image';
import { ForwardArrow } from '../icons/forward-arrow';

export default function Page() {
  return (
    <main className="h-full w-full flex flex-col pl-12 pr-12">
      <section className="flex md:flex-row">
        {/* Left Column */}
        <div className="md:w-1/2 sm:w-full min-h-full flex flex-col items-center pt-6 md:pt-16">
          <h1 className="mt-10 md:text-4xl font-bold tracking-tight text-sm text-gray-900">
            Receba as melhores recomendações de{' '}
            <span className="text-[#6C63FF]">Filmes</span> utilizando{' '}
            <span className="text-[#6C63FF]">Inteligência Artificial</span>
          </h1>
          <p className="items-start mt-8 text-sm md:text-md font-semibold leading-8 text-gray-600">
            Descubra filmes, músicas e curiosidades incríveis através de uma
            experiência intuitiva e conversacional. Peça recomendações e deixe a
            tecnologia fazer o resto.
          </p>
          <div className="self-start">
            <a href="#hey">
              <button className=" mt-6 w-[100%] p-4 hover:bg-[#7C73FF] hover:scale-105 delay-150 ease-in-out transition md:p-0 md:w-48 h-12 bg-primary text-white items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md">
                Começar
                <ForwardArrow tClass="text-white h-6 w-6" />
              </button>
            </a>
          </div>
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
      <section id="hey" className="border">
        <h2 className="text-2xl font-bold">New Link</h2>
        <p className="mt-12 text-gray-700">
          This is the content of the "hey" section that the anchor link
          navigates to.
        </p>
      </section>
    </main>
  );
}
