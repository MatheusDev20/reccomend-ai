/* eslint-disable @next/next/no-img-element */

import { ClockArrow } from '@/app/icons/clock-arrow';
import { formatDate } from '@/app/utils/functions';

type Props = {
  movie: any,
};

export const MovieCard = ({ movie }: Props) => {
  console.log('Movie', movie);
  return (
    <div className="flex min-h-[250px] cursor-pointer overflow-hidden rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {/* Info Section */}
      <div className="info-section w-[70%] h-full bg-white rounded-lg">
        <div className="movie-header flex gap-8 p-4">
          {/* Poster and Title */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={movie.backdrop_full_url}
              alt={movie.title}
              className="max-w-[100px] ml-2 max-h-20 shadow-md rounded-md"
            />
            <h4 className="text-md md:text-xl font-bold text-primary text-center">
              {movie.title}
            </h4>
          </div>

          {/* Movie Details */}
          <div className="flex flex-col justify-between gap-4">
            <h4 className="text-sm md:text-lg leading-8 text-gray-600">
              {formatDate(movie.release_date, true)},{' '}
              <span>{movie.directing.name ?? ''}</span>
            </h4>

            <span className="flex items-center gap-2 text-primary font-bold">
              <ClockArrow />
              {movie.runtime || 'N/A'} min
            </span>
            <div className="flex gap-2">
              {movie.genres
                .slice(0, 3)
                .map((genre: { id: string, name: string }, index: number) => (
                  <span
                    key={index}
                    className="flex justify-center items-center gap-2 px-3 py-1 bg-[#6C63FF] text-white text-sm font-semibold rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Description */}
        <div className="w-full px-4 pb-4">
          <p className="text-gray-600 text-sm">
            {movie.overview || 'No description available.'}
          </p>
        </div>
      </div>

      {/* Background Section */}
      <div
        className="flex flex-1 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${movie.poster_full_url_md})`,
        }}
      />
    </div>
  );
};
