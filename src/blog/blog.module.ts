import { CacheModule, Module } from '@nestjs/common';
import { isProd } from '../main';
import { PrismicModule } from 'src/prismic/prismic.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [
    PrismicModule,
    CacheModule.register({
      ttl: isProd ? 60 * 60 : 0,
      max: 25,
    }),
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
