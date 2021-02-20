import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TrackingMiddleware implements NestMiddleware {
  // TODO: Replace this with persistent storage
  private static readonly logger = new Logger(TrackingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;
    const requestTimeApproximation = Date.now();
    const dnt = req.headers['dnt'];
    const userAgent = req.headers['user-agent'];
    const referrer = req.headers['referer'];

    let ip = req.ip;

    // Try to get ipv4 address from ip. It's in the form ipv6:ipv4.
    const i = ip.lastIndexOf(':');
    if (i > 0) {
      const p1 = ip.substring(0, i);
      const p2 = ip.substring(i + 1);

      if (p2 === undefined) {
        ip = p1;
      } else {
        ip = p2;
      }
    }

    res.on('finish', () => {
      const contentLength = res.getHeader('content-length');
      const statusCode = res.statusCode;
      const statusMessage = res.statusMessage;
      const responseTimeApproximation = Date.now();

      // TODO: Anonymize or disable this if requested (DNT/cookie pref?)
      TrackingMiddleware.logger.log({
        url,
        userAgent,
        ip,
        statusCode: statusCode.toString(),
        statusMessage,
        referrer,
        contentLength,
        dnt,
        requestTimeApproximation: requestTimeApproximation.toString(),
        responseTimeApproximation: responseTimeApproximation.toString(),
      });
    });

    next();
  }
}
