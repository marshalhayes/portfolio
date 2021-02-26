import { CacheModule, Module } from '@nestjs/common';
import { PrismicModule } from 'src/prismic/prismic.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [
    PrismicModule,
    CacheModule.register({
      ttl: process.env.NODE_ENV === 'production' ? 60 * 60 : 0,
      max: 25,
    }),
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
