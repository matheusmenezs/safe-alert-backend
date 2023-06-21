import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { IncidentsRepository } from './repository/incident.repository';
import { UsersRepository } from '../users/repository/user.repository';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [IncidentsController],
  providers: [
    IncidentsService,
    IncidentsRepository,
    UsersRepository,
    PrismaService,
    JwtService,
  ],
})
export class IncidentsModule {}
