import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IncidentCategory } from '@prisma/client';
import { NoticeCategory } from 'src/models/notices/enums/category.enum';

interface SendConfirmationMailDto {
  email: string;
  name: string;
  url: string;
}

interface SendNotificationMailDto {
  email: string;
  name: string;
  category: IncidentCategory;
  description: string;
  risk_scale: number;
  region: string[];
}

interface SendNoticeMailDto {
  email: string;
  name: string;
  category: NoticeCategory;
  description: string;
  title: string;
}

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationMail(sendConfirmationMailDto: SendConfirmationMailDto) {
    const { email, name, url } = sendConfirmationMailDto;

    await this.mailerService.sendMail({
      to: process.env.EMAIL_LOGIN,
      from: process.env.EMAIL_LOGIN,
      subject: 'Safe Alert | Confirmação',
      template: 'confirmation.hbs',
      context: {
        name,
        url,
      },
    });
  }

  async sendNoticeMail(sendNoticeMailDto: SendNoticeMailDto) {
    const { email, name, category, description, title } = sendNoticeMailDto;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_LOGIN,
      subject: 'Safe Alert | Notícia',
      template: 'notice.hbs',
      context: {
        name,
        category,
        description,
        title,
      },
    });
  }

  async sendNotificationMail(SendNotificationMailDto: SendNotificationMailDto) {
    const { email, name, description, risk_scale, region } =
      SendNotificationMailDto;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_LOGIN,
      subject: 'Safe Alert | Notificação',
      template: 'notification.hbs',
      context: {
        name,
        region,
        risk_scale,
        description,
      },
    });
  }
}
