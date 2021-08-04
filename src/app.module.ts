import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { CanonicalUrlMiddleware } from './middleware/canonical.middleware';
import { BlogModule } from './blog/blog.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { PrismicModule } from './prismic/prismic.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismicModule, BlogModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CanonicalUrlMiddleware).forRoutes({
      method: RequestMethod.GET,
      path: '*',
    });
  }
}
