'use client';
import Image from 'next/image';
import { ForwardArrow } from '../icons/forward-arrow';
import { MotivationCard } from '../components/motivation-card';
import { DatabaseIcon } from '../icons/database-icon';
import { SearchPlus } from '../icons/search-plus';
import { CameraIcon } from '../icons/camera-icon';
import Link from 'next/link';
import SideImage from '@/public/media-player-p.png';

export default function Page() {
  return (
    <main className="h-full w-full flex flex-col pl-12 pr-12 gap-12">
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
            <Link href="/main/search">
              <button className=" mt-6 w-[100%] p-4 hover:bg-[#7C73FF] hover:scale-105 delay-150 ease-in-out transition md:p-0 md:w-48 h-12 bg-primary text-white items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md">
                Começar
                <ForwardArrow tClass="text-white h-6 w-6" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 h-full bg-center hidden md:flex">
          <Image src={SideImage} alt="Media Player" className="object-cover" />
        </div>
      </section>
      <section
        id="motivation"
        className="flex justify-center items-center gap-6 flex-col"
      >
        <h2 className="md:text-3xl font-bold">
          Por que utilizar <span className="text-[#6C63FF]">Recomend AI</span>
        </h2>
        <div className="flex gap-5 justify-evenly p-6">
          <MotivationCard
            svg={<DatabaseIcon tClass="h-6 w-6 font-bold text-primary" />}
            content="Conte com um banco de dados ricos para obter filmes dos mais diversos generos"
            title="Banco de dados rico"
          />
          <MotivationCard
            svg={<SearchPlus tClass="h-6 w-6 font-bold text-primary" />}
            content="Parametrize sua busca por filmes de acordo com o seu gosto, gênero favorito, humor e outros."
            title="Busca personalizada"
          />
          <MotivationCard
            svg={<CameraIcon tClass="h-6 w-6 font-bold text-primary" />}
            content="Receba informações prévias sobre o filme escolhido, como sinopse, elenco e direção e trailler"
            title="Informações prévias"
          />
        </div>
      </section>
    </main>
  );
}
