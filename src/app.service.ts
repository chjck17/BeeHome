import { Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class AppService {
  constructor() {}

  async getHello() {
    return true;
  }
}
