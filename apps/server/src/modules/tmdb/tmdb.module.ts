import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '../http/http.module';
import { TmdbAuthProvider } from './tmdb.auth';
import { TMDBController } from './controllers/tmdb.controller';
import { TMDBProvider } from './providers/tmdb.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streaming } from './entities/streaming.entity';
import { StreamingsController } from './controllers/streamings.controller';
import { StreamingProvider } from './providers/streamings.provider';
import { PostgresImplementation } from './db/postgres';

@Module({
  controllers: [TMDBController, StreamingsController],
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
  providers: [
    TmdbAuthProvider,
    TMDBProvider,
    PostgresImplementation,
    StreamingProvider,
    {
      provide: 'Database',
      useClass: PostgresImplementation,
    },
  ],
  exports: [TmdbAuthProvider, TMDBProvider],
})
export class TMDBModule {}
