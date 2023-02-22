import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthenAdminGuard } from '../../auth/guards/jwt-authen.admin.guard';
import { JwtAuthenCustomerGuard } from '../../auth/guards/jwt-authen.customer.guard';
import { JwtAuthenMerchantGuard } from '../../auth/guards/jwt-authen.merchant.guard';
import { JwtAuthenUserGuard } from '../../auth/guards/jwt-authen.user.guard';
import { JwtAbilityGuard } from '../../casl/guard/ability.guard';
import { ABILITY_METADATA_KEY } from '../constants/global.constant';
import { RequiredRule } from '../interfaces/casl.interface';

export const IS_PUBLIC_KEY = Symbol();
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AuthenticateMerchant = () =>
  applyDecorators(UseGuards(JwtAuthenMerchantGuard), ApiBearerAuth());

export const AuthenticateCustomer = () =>
  applyDecorators(UseGuards(JwtAuthenCustomerGuard), ApiBearerAuth());

export const AuthenticateAdmin = () =>
  applyDecorators(UseGuards(JwtAuthenAdminGuard), ApiBearerAuth());

export const AuthenticateUser = () =>
  applyDecorators(UseGuards(JwtAuthenUserGuard), ApiBearerAuth());

export const Authorize = (...requirements: RequiredRule[]) => {
  return applyDecorators(
    UseGuards(JwtAbilityGuard),
    SetMetadata(ABILITY_METADATA_KEY, requirements),
    ApiBearerAuth(),
  );
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
