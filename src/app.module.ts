import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { NestResponseInterceptor } from './core/http/nestResponse.interceptor';
import { HttpExceptionFilter } from './common/filters/httpException.filter';

import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './models/users/users.module';
import { SendMailModule } from './mail/send-mail.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './notifications/task.module';
import { IncidentsModule } from './models/incidents/incidents.module';
import { IncidentsNotificationModule } from './models/incidents-notification/incidents-notification.module';
import { NoticesModule } from './models/notices/notice.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SendMailModule,
    TaskModule,
    IncidentsModule,
    IncidentsNotificationModule,
    NoticesModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: NestResponseInterceptor,
    },
  ],
})
export class AppModule {}
