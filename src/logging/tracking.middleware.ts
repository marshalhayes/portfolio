import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestLogService } from '../logging/request-log.service';

@Injectable()
export class TrackingMiddleware implements NestMiddleware {
  // Ignore patterns for user agents I don't care about
  private static readonly userAgentsToIgnore = [/^\bkube-probe\b/i];

  constructor(private readonly requestLogService: RequestLogService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'];
    if (
      TrackingMiddleware.userAgentsToIgnore.filter((r) => userAgent.match(r))
        .length > 0
    ) {
      return next();
    }

    const url = req.originalUrl;
    const requestTimeApproximation = new Date(Date.now());
    const dnt = req.headers['dnt']?.toString() === '1';
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

    next();

    const contentLength = res.getHeader('content-length').toString();
    const statusCode = res.statusCode;
    const statusMessage = res.statusMessage;
    const responseTimeApproximation = new Date(Date.now());

    // Write to the database
    if (process.env.NODE_ENV === 'production' && !dnt) {
      this.requestLogService.requestLogRepository.insert({
        requestUrl: url,
        userAgent,
        ip,
        statusCode,
        statusMessage,
        referrer,
        dnt,
        contentLength: parseInt(contentLength, 10),
        requestTime: requestTimeApproximation,
        responseTime: responseTimeApproximation,
      });
    }
  }
}
