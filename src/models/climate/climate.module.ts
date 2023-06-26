import { Module } from '@nestjs/common';
import { ClimateService } from './climate.service';
import { ClimateController } from './climate.controller';
import { ClimateRepository } from './repository/climate.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ClimateController],
  providers: [ClimateService, ClimateRepository, PrismaService],
})
export class ClimateModule {}
