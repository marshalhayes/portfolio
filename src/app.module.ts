import {
  CacheModule,
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
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLog } from './logging/request-log.entity';
import { RequestLogModule } from './logging/request-log.module';
import { isProd } from './main';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismicModule,
    BlogModule,
    CacheModule.register({
      ttl: isProd ? 60 * 60 : 0,
      max: 25,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_DB_HOST,
      port: parseInt(process.env.POSTGRES_DB_PORT, 10),
      username: process.env.POSTGRES_DB_USER,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: 'marshalhayes_dev',
      entities: [RequestLog],
      synchronize: false,
    }),

    RequestLogModule,
  ],
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
