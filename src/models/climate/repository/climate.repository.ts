import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClimateDto } from '../dto/create-climate.dto';
import { Climate } from '@prisma/client';

@Injectable()
export class ClimateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async registerClimate(climate: CreateClimateDto): Promise<Climate> {
    const newClimate = this.prismaService.climate.upsert({
      where: { date: climate.date },
      update: {
        ...climate,
      },
      create: {
        ...climate,
      },
    });

    return newClimate;
  }

  async findClimateByDate(date: string[]): Promise<Climate[]> {
    const climateFound = await this.prismaService.climate.findMany({
      where: {
        date: {
          in: date,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    return climateFound;
  }

  async findAll(): Promise<Climate[]> {
    const climateFound = await this.prismaService.climate.findMany({
      orderBy: {
        date: 'asc',
      },
    });

    return climateFound;
  }
}
