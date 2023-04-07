// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';
// import { ErrorResponse } from '../interfaces/error-res.interface';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

//   catch(exception: Error, host: ArgumentsHost): void {
//     // In certain situations `httpAdapter` might not be available in the
//     // constructor method, thus we should resolve it here.

//     const { httpAdapter } = this.httpAdapterHost;
//     const ctx = host.switchToHttp();
//     const path = httpAdapter.getRequestUrl(ctx.getRequest());

//     console.log(`exception at ${path}: `, exception);

//     const httpStatus =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     const responseBody: ErrorResponse = {
//       statusCode: httpStatus,
//       timestamp: new Date().toISOString(),
//       path,
//     };

//     responseBody.subInfo = exception;

//     httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
//   }
// }

import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { HttpAdapterHost } from '@nestjs/core';
import { I18nContext } from 'nestjs-i18n';
import { AppEnvironment } from '../enums/app.enum';
import { ErrorResponse } from '../interfaces/error-res.interface';
import { CustomException } from '../exceptions/custom-test.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const path = httpAdapter.getRequestUrl(ctx.getRequest());

    console.log(`exception at ${path}: `, exception);

    let status: number;
    let message: string;
    let subCode: number;

    if (exception instanceof CustomException) {
      status = exception.status;
    } else if (exception instanceof BadRequestException) {
      const response = exception.getResponse() as any;
      if (Array.isArray(response?.message)) {
        status = HttpStatus.BAD_REQUEST;
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseBody: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path,
    };

    if (process.env.NODE_ENV !== AppEnvironment.PRODUCTION) {
      responseBody.debugInfo = exception;
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
