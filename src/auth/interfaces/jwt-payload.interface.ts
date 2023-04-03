export interface JwtAuthPayload {
  userId: number;
}

export interface VerificationLessorPayload {
  token: string;
  lessorId: number;
}
