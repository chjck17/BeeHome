// import { Injectable } from '@nestjs/common';
// import {
//   SESClient,
//   SendTemplatedEmailCommand,
//   SendTemplatedEmailCommandInput,
// } from '@aws-sdk/client-ses';
// import { ConfigService } from '@nestjs/config';
// import { GlobalConfig } from '../../common/config/global.config';

// @Injectable()
// export class EmailService {
//   private client: SESClient;
//   private sender: string;

//   constructor(private configService: ConfigService<GlobalConfig>) {
//     this.client = new SESClient({
//       region: configService.get('aws.region'),
//       credentials: {
//         accessKeyId: configService.get('aws.accessKeyId'),
//         secretAccessKey: configService.get('aws.accessKeySecret'),
//       },
//     });
//     const senderName = configService.get('aws.ses.sender.name');
//     const senderEmail = configService.get('aws.ses.sender.email');

//     this.sender = `${senderName} <${senderEmail}>`;
//   }

//   async sendTemplateEmail(
//     input: Omit<SendTemplatedEmailCommandInput, 'Source'>,
//   ) {
//     const command = new SendTemplatedEmailCommand({
//       Source: this.sender,
//       ...input,
//     });

//     const result = await this.client.send(command);
//   }
// }
