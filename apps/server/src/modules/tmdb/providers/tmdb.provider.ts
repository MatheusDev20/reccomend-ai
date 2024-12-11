import { MovieDTO, StreamingOutput } from '../../../@types/index';
import { Injectable } from '@nestjs/common';
import { FireExternalRequest } from '../../http/fire-request';
import { movieDetailsParser } from '../outputs';

type Input = {
  movieName: string;
};

type ProviderOutput<T> = {
  data: T;
};

@Injectable()
export class TMDBProvider {
  constructor(private fireRequestProvider: FireExternalRequest) {}

  async getMovieDetails({
    movieName,
  }: Input): Promise<ProviderOutput<MovieDTO>> {
    const path = '/search/movie';
    const queryParams = {
      query: movieName,
    };
    const response = await this.fireRequestProvider.fire({ path, queryParams });
    const details = movieDetailsParser(response);
    const availableStreamings = await this.getAvailableStreamings(details.id);

    return { data: { ...details, streamings: availableStreamings } };
  }

  async getAvailableStreamings(movieId: number): Promise<StreamingOutput[]> {
    try {
      const path = `/movie/${movieId}/watch/providers`;
      const response = await this.fireRequestProvider.fire({ path });

      if (!response.results || !response.results['BR']) return [];
      return response.results.BR.flatrate as StreamingOutput[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
