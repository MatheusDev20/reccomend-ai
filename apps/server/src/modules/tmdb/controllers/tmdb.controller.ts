import { Controller, Get, Query } from '@nestjs/common';
import { TMDBProvider } from '../providers/tmdb.provider';
import { GetMovieDetailsDTO } from '../inputs';
import { ok } from 'src/shared/http/common-responses';

@Controller('movie')
export class TMDBController {
  constructor(private provider: TMDBProvider) {}

  @Get('/')
  async movieDetails(@Query() query: GetMovieDetailsDTO) {
    const movie = await this.provider.getMovieDetails({
      movieName: query.movieName,
    });

    return ok(movie);
  }
}
