import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IIncidentsNotificationRepository } from './i-incidents-notification-repository';
import { IncidentsNotification } from '../entities/incidents-notification.entity';

@Injectable()
export class IncidentsNotificationRepository
  implements IIncidentsNotificationRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    incident_id: string,
    emergency_service_id: string,
    user_id: string,
  ): Promise<IncidentsNotification> {
    const newIncident = await this.prismaService.incidentNotification.create({
      data: {
        agent_id: user_id,
        incident_id,
        emergency_service_id,
      },
    });
    return newIncident;
  }

  async findById(id: string): Promise<IncidentsNotification> {
    const incidentFound =
      await this.prismaService.incidentNotification.findFirst({
        where: { id },
      });

    return incidentFound;
  }

  async findAll(): Promise<IncidentsNotification[]> {
    const allIncidents =
      await this.prismaService.incidentNotification.findMany();

    return allIncidents;
  }
}
