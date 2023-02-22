import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorResponse } from '../interfaces/error-res.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const path = httpAdapter.getRequestUrl(ctx.getRequest());

    console.log(`exception at ${path}: `, exception);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: ErrorResponse = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path,
    };

    responseBody.subInfo = exception;

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
