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

    if (incidentFound) {
      const emergencyServiceName = await this.prismaService.user.findFirst({
        where: { id: incidentFound?.emergency_service_id },
      });

      const incidentFormatted = {
        id: incidentFound?.id,
        agent_id: incidentFound?.agent_id,
        incident_id: incidentFound?.incident_id,
        emergency_service_name: emergencyServiceName?.name,
        created_at: incidentFound?.created_at,
        updated_at: incidentFound?.updated_at,
      };

      return incidentFormatted;
    }

    return incidentFound;
  }

  async findAll(): Promise<IncidentsNotification[]> {
    const allIncidents =
      await this.prismaService.incidentNotification.findMany();

    if (allIncidents.length > 0) {
      const allIncidentsFormatted = allIncidents.map(async (incident) => {
        let emergencyServiceName = null;

        if (incident.emergency_service_id != null) {
          emergencyServiceName = await this.prismaService.user.findFirst({
            where: { id: incident?.emergency_service_id },
          });
        }

        const incidentFormatted = {
          id: incident?.id,
          agent_id: incident?.agent_id,
          incident_id: incident?.incident_id,
          emergency_service_name: emergencyServiceName?.name,
          created_at: incident?.created_at,
          updated_at: incident?.updated_at,
        };

        return incidentFormatted;
      });

      return Promise.all(allIncidentsFormatted);
    }

    return allIncidents;
  }
}
