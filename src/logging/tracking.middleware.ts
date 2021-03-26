import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { isProd } from '../main';
import { RequestLogService } from '../logging/request-log.service';

@Injectable()
export class TrackingMiddleware implements NestMiddleware {
  // Ignore patterns for user agents I don't care about
  private static readonly userAgentsToIgnore = [/^\bkube-probe\b/i];

  private readonly logger = new Logger(TrackingMiddleware.name, true);

  constructor(private readonly requestLogService: RequestLogService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent']?.toString() || '';
    const dnt = req.headers['dnt']?.toString() === '1';

    if (
      dnt ||
      TrackingMiddleware.userAgentsToIgnore.filter((r) => userAgent.match(r))
        .length > 0
    ) {
      return next();
    }

    const url = req.originalUrl;
    const requestTimeApproximation = new Date(Date.now());
    const referrer = req.headers['referer'];

    const ip =
      req.headers[process.env.CLOUD_PROVIDER_REAL_IP_HEADER_NAME]?.toString() ||
      req.ip;

    next();

    const contentLength = res.getHeader('content-length')?.toString() || '0';
    const statusCode = res.statusCode;
    const statusMessage = res.statusMessage;
    const responseTimeApproximation = new Date(Date.now());

    const requestLogRecord = {
      requestUrl: url,
      userAgent,
      ip,
      statusCode,
      statusMessage,
      referrer,
      contentLength: parseInt(contentLength, 10),
      requestTime: requestTimeApproximation,
      responseTime: responseTimeApproximation,
    };

    // Write to the database
    if (isProd) {
      this.requestLogService.requestLogRepository.insert(requestLogRecord);
    } else {
      this.logger.log(requestLogRecord);
    }
  }
}
