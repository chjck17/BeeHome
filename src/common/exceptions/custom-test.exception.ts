// import {
//   BadRequestException,
//   ConflictException,
//   ForbiddenException,
//   HttpException,
//   InternalServerErrorException,
//   NotFoundException,
//   UnauthorizedException,
// } from '@nestjs/common';

// export class ForbiddenExc extends ForbiddenException {
//   constructor(private errMsg: string = 'Forbidden Exception!') {
//     super(errMsg);
//   }
// }
// export class NotFoundExc extends NotFoundException {
//   constructor(private errMsg: string = 'Not Found!') {
//     super(errMsg);
//   }
// }

// export class UnauthorizedExc extends UnauthorizedException {
//   constructor(private errMsg: string = 'Invalid credentials') {
//     super(errMsg);
//   }
// }

// export class ConflictExc extends ConflictException {
//   constructor(private errMsg: string = 'Conflict Resource Exception') {
//     super(errMsg);
//   }
// }

// export class BadRequestExc extends BadRequestException {
//   constructor(private errMsg: string = 'Bad request') {
//     super(errMsg);
//   }
// }

// export class InternalServerErrorExc extends InternalServerErrorException {
//   constructor(
//     private errMsg: string = 'Server is meeting some internal error. Please try on later!',
//   ) {
//     super(errMsg);
//   }
// }

// export class ExpectationFailedExc extends HttpException {
//   constructor(errMsg?: string) {
//     super(errMsg, 417);
//   }
// }
import { NonFunctionProperties } from '../types/utils.type';

export class CustomException {
  status: number;
  params?: object;

  constructor({ status, params }: NonFunctionProperties<CustomException>) {
    this.status = status;
    this.params = params;
  }
}

export class ForbiddenExc extends CustomException {
  constructor(params?: object) {
    super({ status: 403, params });
  }
}

export class NotFoundExc extends CustomException {
  constructor(params?: object) {
    super({ status: 404, params });
  }
}

export class AddPointBaseExc extends CustomException {
  constructor(params?: object) {
    super({ status: 400, params });
  }
}

export class UnauthorizedExc extends CustomException {
  constructor(params?: object) {
    super({ status: 401, params });
  }
}

export class ConflictExc extends CustomException {
  constructor(params?: object) {
    super({ status: 409, params });
  }
}

export class BadRequestExc extends CustomException {
  constructor(params?: object) {
    super({ status: 400, params });
  }
}

export class InternalServerErrorExc extends CustomException {
  constructor(params?: object) {
    super({ status: 500, params });
  }
}

export class ExpectationFailedExc extends CustomException {
  constructor(params?: object) {
    super({ status: 417, params });
  }
}

export class ServiceUnavailableExc extends CustomException {
  constructor(params?: object) {
    super({ status: 503, params });
  }
}
