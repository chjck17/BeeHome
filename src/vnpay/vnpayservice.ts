import { Injectable } from '@nestjs/common';
// ESM
import { OnePayDomestic } from 'vn-payments';
import { OnePayInternational } from 'vn-payments';
import { VNPay } from 'vn-payments';
import { SohaPay } from 'vn-payments';
import { NganLuong } from 'vn-payments';
// CommonJS

@Injectable()
export class VNPayService {
  constructor() {}
  // Triển khai các phương thức thanh toán VNPay ở đây

  async vnpay() {
    // const { OnePayDomestic } = require('vn-payments');
    // const { OnePayInternational } = require('vn-payments');
    // const { VNPay } = require('vn-payments');
    // const { SohaPay } = require('vn-payments');
    // const { NganLuong } = require('vn-payments');
  }
}
