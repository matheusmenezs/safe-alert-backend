import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: '587',
        secure: false,
        auth: {
          user: process.env.EMAIL_LOGIN,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"Teste de Email" <${process.env.EMAIL_LOGIN}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [SendMailService],
  exports: [SendMailService],
})
export class SendMailModule {}
