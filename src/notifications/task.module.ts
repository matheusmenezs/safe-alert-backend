import { Module } from '@nestjs/common';
import { SendNotificationService } from './send-notification.service';

import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMailService } from 'src/mail/send-mail.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [
    TasksService,
    SendNotificationService,
    PrismaService,
    SendMailService,
  ],
  exports: [TasksService, SendNotificationService],
})
export class TaskModule {}
