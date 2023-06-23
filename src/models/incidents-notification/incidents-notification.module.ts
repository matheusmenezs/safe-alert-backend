import { Module } from '@nestjs/common';
import { IncidentsNotificationService } from './incidents-notification.service';
import { IncidentsNotificationController } from './incidents-notification.controller';
import { IncidentsNotificationRepository } from './repository/incident-notification.repository';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/repository/user.repository';
import { PrismaService } from 'prisma/prisma.service';
import { IncidentsRepository } from '../incidents/repository/incident.repository';
import { SendMailService } from 'src/mail/send-mail.service';

@Module({
  controllers: [IncidentsNotificationController],
  providers: [
    IncidentsNotificationService,
    IncidentsNotificationRepository,
    JwtService,
    UsersRepository,
    PrismaService,
    IncidentsRepository,
    SendMailService,
  ],
})
export class IncidentsNotificationModule {}
