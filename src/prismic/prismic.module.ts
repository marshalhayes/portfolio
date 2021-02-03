import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismicService } from './prismic.service';
import prismicConfig from 'config/prismic.config';

@Module({
  imports: [ConfigModule.forFeature(prismicConfig), HttpModule],
  providers: [PrismicService],
  exports: [PrismicService],
})
export class PrismicModule {}
