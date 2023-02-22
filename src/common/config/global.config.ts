import * as dotenv from 'dotenv';
import { RecursiveKeyOf } from '../types/utils.type';
dotenv.config();

const globalConfig = {
  port: +process.env.PORT || 5000,
  webMerchantDomain: process.env.WEB_MERCHANT_DOMAIN,
  serverDomain: process.env.SERVER_DOMAIN,

  auth: {
    accessToken: {
      secret: process.env.AUTH_JWT_ACCESS_KEY,
      algorithm: 'HS256',
      expiresTime: '3d',
    },

    refreshToken: {
      secret: process.env.AUTH_JWT_REFRESH_KEY,
      algorithm: 'HS256',
      expiresTime: '3d',
    },

    verification: {
      tokenExpiresIn: 86400, // seconds, = 24h
      verifySuccessPath: '/verify-success',
    },
  },

  event: {
    spin: {
      jwtSecretKey: process.env.EVENT_SPIN_JWT_SECRET_KEY,
      jwtExpires: process.env.EVENT_SPIN_JWT_EXPIRES,
      minRandomNumber: 0,
      maxRandomNumber: 9999,
    },
  },

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    accessKeySecret: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,

    s3: {
      bucketName: process.env.AWS_S3_BUCKET_NAME,
      limitSizeMb: +process.env.AWS_S3_LIMIT_SIZE_MB,
      presignTimeOut: +process.env.AWS_S3_PRESIGN_TIME_OUT,
    },

    ses: {
      sender: {
        name: 'BiliSoftware',
        email: process.env.AWS_SES_SENDER_EMAIL,
      },
      templateName: {
        merchant: {
          verifyEmailRequest:
            process.env.AWS_SES_TEMPLATE_VERIFY_MERCHANT_REQUEST,
          accountApproved: process.env.AWS_SES_TEMPLATE_MERCHANT_APPROVED,
          accountRefused: process.env.AWS_SES_TEMPLATE_MERCHANT_REJECTED,
        },
      },
    },
  },

  firebase: {
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
};

export default () => globalConfig;
export type GlobalConfig = Record<RecursiveKeyOf<typeof globalConfig>, string>;
