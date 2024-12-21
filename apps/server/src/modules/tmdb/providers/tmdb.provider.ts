import { StreamingOutput } from './../../../@types/index';
import { MovieDTO } from '../../../@types/index';
import { Injectable } from '@nestjs/common';
import { FireExternalRequest } from '../../http/fire-request';
import { movieDetailsParser } from '../outputs';

type Input = {
  movieName: string;
  myStreamings?: string[];
};

@Injectable()
export class TMDBProvider {
  constructor(private fireRequestProvider: FireExternalRequest) {}

  async getMovieDetails(data: Input): Promise<MovieDTO | null> {
    const searchPath = '/search/movie';
    const { movieName, myStreamings } = data;

    const search = await this.fireRequestProvider.fire({
      path: searchPath,
      queryParams: {
        query: movieName,
      },
    });

    if (!search.results || search.results.length === 0) return null;
    const [movie] = search.results;

    const movieDetails = await this.fireRequestProvider.fire({
      path: `movie/${movie.id}`,
      queryParams: { language: 'pt-BR' },
    });

    const movieCredits = this.fireRequestProvider.fire({
      path: `/movie/${movie.id}/credits`,
      queryParams: { language: 'pt-BR' },
    });

    const [details, credits] = await Promise.all([movieDetails, movieCredits]);

    const parsed = movieDetailsParser({ ...details, ...credits });
    const movieAvailableStreamings = await this.getAvailableStreamings(
      details.id,
    );

    if (myStreamings) {
      const isAvailableOnMySelectedStreamings = this.checkIfAvailable(
        myStreamings,
        movieAvailableStreamings,
      );

      if (!isAvailableOnMySelectedStreamings) return null;
      return { ...parsed, streamings: movieAvailableStreamings };
    }

    return { ...parsed, streamings: movieAvailableStreamings };
  }

  async getAvailableStreamings(movieId: number): Promise<StreamingOutput[]> {
    try {
      const path = `/movie/${movieId}/watch/providers`;
      const response = await this.fireRequestProvider.fire({
        path,
        queryParams: { language: 'pt-BR' },
      });

      if (!response.results || !response.results['BR']) return [];
      return (response.results.BR.flatrate as StreamingOutput[]) ?? [];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  checkIfAvailable(
    myStreamings: string[],
    availableStreamings: StreamingOutput[],
  ) {
    const isAvailable = availableStreamings.some((streaming) => {
      const normalize = streaming.provider_name.replace(/\s/g, '').trim();
      const normalizedStreamingInput = myStreamings.map((s) =>
        s.replace(/\s/g, '').trim(),
      );
      return normalizedStreamingInput.some((s) => s.includes(normalize));
    });

    return isAvailable;
  }
}
