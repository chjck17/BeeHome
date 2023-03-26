import { PartialNonFunctionProperties } from '../../../../common/types/utils.type';

export class AuthTokenResDto {
  accessToken: string;
  refreshToken: string;

  static mapProperty(
    dto: AuthTokenResDto,
    data: PartialNonFunctionProperties<AuthTokenResDto>,
  ) {
    dto.accessToken = data.accessToken;
    dto.refreshToken = data.refreshToken;
  }

  static forCustomer(data?: PartialNonFunctionProperties<AuthTokenResDto>) {
    const result = new AuthTokenResDto();
    if (!data) return result;

    this.mapProperty(result, data);

    return result;
  }

  static forLessor(data?: PartialNonFunctionProperties<AuthTokenResDto>) {
    const result = new AuthTokenResDto();
    if (!data) return result;

    this.mapProperty(result, data);

    return result;
  }

  static forAdmin(data?: PartialNonFunctionProperties<AuthTokenResDto>) {
    const result = new AuthTokenResDto();
    if (!data) return result;

    this.mapProperty(result, data);

    return result;
  }
}
