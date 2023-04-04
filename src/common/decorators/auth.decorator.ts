import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthenAdminGuard } from '../../auth/guards/jwt-authen.admin.guard';
import { JwtAuthenCustomerGuard } from '../../auth/guards/jwt-authen.customer.guard';
import { JwtAuthenLessorGuard } from '../../auth/guards/jwt-authen.lessor.guard';
import { JwtAuthenUserGuard } from '../../auth/guards/jwt-authen.user.guard';
import { JwtAbilityGuard } from '../../casl/guard/ability.guard';
import { ABILITY_METADATA_KEY } from '../constants/global.constant';
import { RequiredRule } from '../interfaces/casl.interface';
import { JwtAuthenManagerGuard } from '../../auth/guards/jwt-authe.manager.guard';
import { BadRequestExc } from '../exceptions/custom.exception';
import { JwtAbilityLessorGuard } from '../../casl/guard/ability.lessor.guard';

export const IS_PUBLIC_KEY = Symbol();
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AuthenticateLessor = () =>
  applyDecorators(UseGuards(JwtAuthenLessorGuard), ApiBearerAuth());

export const AuthenticateCustomer = () =>
  applyDecorators(UseGuards(JwtAuthenCustomerGuard), ApiBearerAuth());

export const AuthenticateAdmin = () =>
  applyDecorators(UseGuards(JwtAuthenAdminGuard), ApiBearerAuth());

export const AuthenticateManager = () =>
  applyDecorators(UseGuards(JwtAuthenManagerGuard), ApiBearerAuth());

export const AuthenticateUser = () =>
  applyDecorators(UseGuards(JwtAuthenUserGuard), ApiBearerAuth());

export const Authorize = (...requirements: RequiredRule[]) => {
  return applyDecorators(
    UseGuards(JwtAbilityGuard),
    SetMetadata(ABILITY_METADATA_KEY, requirements),
    ApiBearerAuth(),
  );
};

export const AuthorizeLessor = (...requirements: RequiredRule[]) => {
  return applyDecorators(
    UseGuards(JwtAbilityLessorGuard),
    SetMetadata(ABILITY_METADATA_KEY, requirements),
    ApiBearerAuth(),
  );
};

// Use snake case because header get automatically convert to lowercase
export const LessorId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    if (
      !request.headers?.merchant_id ||
      Number(request.headers.merchant_id) <= 0
    )
      throw new BadRequestExc('');

    return request.headers.merchant_id;
  },
);

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
