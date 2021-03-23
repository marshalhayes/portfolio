import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLog } from './request-log.entity';
import { RequestLogService } from './request-log.service';
import { TrackingMiddleware } from './tracking.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([RequestLog])],
  providers: [RequestLogService],
  exports: [TypeOrmModule],
})
export class RequestLogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrackingMiddleware).forRoutes({
      method: RequestMethod.GET,
      path: '*',
    });
  }
}
