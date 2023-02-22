export interface JwtAuthPayload {
  userId: number;
}

export interface VerificationMerchantPayload {
  token: string;
  merchantId: number;
}
