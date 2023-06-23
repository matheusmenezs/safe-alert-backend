import { Module } from '@nestjs/common';
import { NoticesController } from './notice.controller';
import { NoticeRepository } from './repository/notice.repository';
import { UsersRepository } from '../users/repository/user.repository';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { NoticeService } from './notice.service';

@Module({
  controllers: [NoticesController],
  providers: [
    NoticeService,
    NoticeRepository,
    UsersRepository,
    PrismaService,
    JwtService,
  ],
})
export class NoticesModule {}
