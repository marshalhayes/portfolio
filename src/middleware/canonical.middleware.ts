import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CanonicalUrlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.locals.canonicalUrl = `${req.protocol}://marshalhayes.dev${
      req.path !== '/' ? req.path : ''
    }`;

    next();
  }
}
