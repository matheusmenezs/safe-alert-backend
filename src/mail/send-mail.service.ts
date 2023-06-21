import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface SendConfirmationMailDto {
  email: string;
  name: string;
  url: string;
}

interface SendNotificationMailDto {
  email: string;
  name: string;
  region: string;
  risk_scale: string;
}

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationMail(sendConfirmationMailDto: SendConfirmationMailDto) {
    const { email, name, url } = sendConfirmationMailDto;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_LOGIN,
      subject: 'Safe Alert | Confirmação',
      template: 'confirmation.hbs',
      context: {
        name,
        url,
      },
    });
  }

  async sendNotificationMail(SendNotificationMailDto: SendNotificationMailDto) {
    const { email, name, region, risk_scale } = SendNotificationMailDto;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_LOGIN,
      subject: 'Safe Alert | Notificação',
      template: 'notification.hbs',
      context: {
        name,
        region,
        risk_scale,
      },
    });
  }
}
