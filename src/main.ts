import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import reactExpressEngine from './react.engine';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Disable stuff I don't need
  app.disable('x-powered-by');
  app.set('etag', false);

  // Configure paths to our static assets and views
  const currentDir = __dirname;

  const viewPath = join(currentDir, '../../ui/', 'views');
  const assetsPath = join(currentDir, '../../', 'public');

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [
            "'self'",
            'https://disqus.com',
            'https://*.disqus.com',
            'https://*.disquscdn.com',
            'https://disquscdn.com',
          ],
          imgSrc: [
            "'self'",
            'https://prismic.io',
            'https://*.prismic.io',
            'https://disqus.com',
            'https://*.disqus.com',
            'https://*.disquscdn.com',
            'https://disquscdn.com',
            "'unsafe-inline'",
            'data:',
          ],
          styleSrc: [
            "'self'",
            'https://disqus.com',
            'https://*.disqus.com',
            'https://*.disquscdn.com',
            'https://disquscdn.com',
            "'unsafe-inline'",
          ],
        },
      },
    }),
  );

  app.setBaseViewsDir(viewPath);
  app.useStaticAssets(assetsPath, {
    prefix: '/public',
    etag: false,
  });

  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const port = parseInt(configService.get<string>('PORT'));

  // Use the custom react engine
  app.engine('tsx', reactExpressEngine);
  app.setViewEngine('tsx');

  await app.listen(port || 8000);
}

bootstrap();
