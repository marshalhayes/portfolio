import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismicService } from './prismic.service';
import prismicConfig from 'config/prismic.config';
import { PrismicPreviewController } from './prismic-preview.controller';
import { PrismicPreviewMiddleware } from './prismic-preview.middleware';

@Module({
  imports: [
    ConfigModule.forFeature(prismicConfig),
    HttpModule.register({
      timeout: 1000,
      timeoutErrorMessage: 'TIMEOUT',
    }),
  ],
  controllers: [PrismicPreviewController],
  providers: [PrismicService],
  exports: [PrismicService],
})
export class PrismicModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PrismicPreviewMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.GET,
    });
  }
}
