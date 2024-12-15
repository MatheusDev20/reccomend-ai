/* eslint-disable @typescript-eslint/no-unused-vars */
import { MovieDTO } from 'src/@types';
import { tmdbConfig } from 'src/config/tmdb';

export const movieDetailsParser = (data: any): MovieDTO => {
  const {
    backdrop_path,
    poster_path,
    adult,
    belongs_to_collection,
    production_companies,
    production_countries,
    spoken_languages,
    crew,
    cast,
    ...rest
  } = data;
  const directing = crew.find(
    (member: any) => member.department === 'Directing',
  );
  return {
    ...rest,
    directing: directing ? { name: directing.name, id: directing.id } : null,
    backdrop_full_url: `${process.env.TMDB_SECURE_BASE_IMG_URL}/${tmdbConfig.backdrop_sizes.w300}/${backdrop_path}`,
    poster_full_url_md: `${process.env.TMDB_SECURE_BASE_IMG_URL}/${tmdbConfig.poster_sizes.w300}/${poster_path}`,
    poster_full_url_lg: `${process.env.TMDB_SECURE_BASE_IMG_URL}/${tmdbConfig.poster_sizes.w780}/${poster_path}`,
  };
};
