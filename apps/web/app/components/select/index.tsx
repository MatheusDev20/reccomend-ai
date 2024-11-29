import MovieIcon from '@/public/movies.svg';
import MusicIcon from '@/public/music.svg';
import Link from 'next/link';
import { SubjectCard } from '../subject-card';
import Image from 'next/image';

const recomendations = [
  {
    title: 'Filmes',
    icon: MovieIcon,
    redirectTo: 'movies',
  },
  {
    title: 'Músicas',
    icon: MusicIcon,
    redirectTo: 'music',
  },
];

export const SelectCard = () => {
  return (
    <section className="flex flex-col items-center gap-12 justify-center p-12">
      <p className="text-sm md:text-xl dark:text-cyan-400">
        Tenha recomendações de filmes músicas e muito mais, baseadas nos seus
        gostos!
      </p>

      <p className="dark:text-white">Quero recomendações de: </p>
      <div className="flex flex-col gap-6 w-[50%]">
        {recomendations.map((recomendation) => (
          <Link
            key={recomendation.title}
            href={`/recomendations/${recomendation.redirectTo}`}
            className="w-full"
          >
            <SubjectCard
              icon={
                <Image
                  className="h-12 w-12 object-cover rounded-full"
                  src={recomendation.icon}
                  alt={recomendation.title}
                />
              }
              title={recomendation.title}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
