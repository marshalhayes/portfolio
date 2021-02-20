import { existsSync } from 'fs';
import { join } from 'path';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

/**
 * The HttpExceptionFilter class is responsible for
 * capturing any thrown HttpException. If the thrown
 * status code matches has a view, then it is rendered
 * as the response. Otherwise, only the status code is sent
 * back to the client.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name, true);

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();
    const req = context.getRequest<Request>();
    const status = exception.getStatus();

    // Log the exception
    this.logger.debug(`${req.url} returned status code ${status}`);

    // Look for a view that goes along with the status code
    const pathToExceptionPage = join(
      __dirname,
      `../../../ui/views/${status}.tsx`,
    );

    if (!existsSync(pathToExceptionPage)) {
      return res.sendStatus(status);
    }

    return res.status(status).render(pathToExceptionPage);
  }
}
