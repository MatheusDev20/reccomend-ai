import { Module } from '@nestjs/common';
import { PromptModule } from './modules/prompt/prompt.module';
import { ConfigModule } from '@nestjs/config';
import { SpotfyModule } from './modules/spotfy/spotfy.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TMDBModule } from './modules/tmdb/tmdb.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDBConfigService } from './config/db';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresDBConfigService,
      inject: [PostgresDBConfigService],
    }),
    PromptModule,
    SpotfyModule,
    TMDBModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    CacheModule.register(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
