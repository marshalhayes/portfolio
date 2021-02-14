import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class PrismicPreviewMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // I'm so sorry
    res.locals.isPreview =
      (req.cookies ? req.cookies['io.prismic.preview'] ?? '' : '').length > 0;

    next();
  }
}
