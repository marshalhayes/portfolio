import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { PrismicModule } from './prismic/prismic.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismicModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
