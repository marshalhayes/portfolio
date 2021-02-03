import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import reactExpressEngine from './react.engine';

export const pathToStaticAssets = join(
  __dirname.substring(0, __dirname.lastIndexOf('/')),
  'static',
);

export const pathToViews = join(
  __dirname.substring(0, __dirname.lastIndexOf('/')),
  'views',
);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure paths to our static assets and views
  app.setBaseViewsDir(pathToViews);
  app.useStaticAssets(pathToStaticAssets, {
    prefix: '/static',
  });

  // Use the custom react engine
  app.engine('tsx', reactExpressEngine);
  app.setViewEngine('tsx');

  await app.listen(8000);
}
bootstrap();
