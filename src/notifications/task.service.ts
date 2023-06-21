import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendNotificationService } from './send-notification.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly sendNotificationService: SendNotificationService,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  notifyUsers() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    //const now = new Date();

    //To do: implements notification for users
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  notifyAgent() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    //const now = new Date();
    //To do: implements notification for agent
  }
}
