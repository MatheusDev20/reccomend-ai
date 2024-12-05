import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '../http/http.module';
import { TmdbAuthProvider } from './tmdb.auth';
import { TMDBController } from './tmdb.controller';
import { TMDBProvider } from './tmdb.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streaming } from './entities/streaming.entity';

@Module({
  controllers: [TMDBController],
  imports: [
    TypeOrmModule.forFeature([Streaming]),
    CacheModule.register(),
    HttpModule.register({
      baseUrl: `https://api.themoviedb.org/3/`,
      authClass: TmdbAuthProvider,
      requireAuth: true,
    }),
    LoggerModule,
  ],
  providers: [TmdbAuthProvider, TMDBProvider],
  exports: [TmdbAuthProvider],
})
export class TMDBModule {}
