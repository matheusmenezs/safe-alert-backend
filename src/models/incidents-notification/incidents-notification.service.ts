import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateIncidentsNotificationDto } from './dto/create-incidents-notification.dto';
import { IUserRequestData } from 'src/auth/auth.controller';
import { UsersRepository } from '../users/repository/user.repository';
import { IncidentsNotificationRepository } from './repository/incident-notification.repository';
import { IncidentsNotification } from './entities/incidents-notification.entity';
import { IncidentsRepository } from '../incidents/repository/incident.repository';
import { SendNotificationService } from 'src/notifications/send-notification.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class IncidentsNotificationService {
  constructor(
    private readonly incidentsNotificationRepository: IncidentsNotificationRepository,
    private readonly usersRepository: UsersRepository,
    private readonly incidentRepository: IncidentsRepository,
    private readonly prismaService: PrismaService,
    private readonly sendNotificationService: SendNotificationService,
  ) {}

  private readonly logger = new Logger();

  async create(
    { emergency_service_name, incident_id }: CreateIncidentsNotificationDto,
    { user }: IUserRequestData,
  ): Promise<IncidentsNotification> {
    const userFound = await this.usersRepository.findById(user.id);

    if (!userFound) {
      throw new BadRequestException({
        message: 'User not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const incidentExists = await this.incidentRepository.findById(incident_id);

    if (!incidentExists) {
      throw new BadRequestException({
        message: 'Incident not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const regionIncidents = await this.incidentRepository.findRegionIncident(
      incident_id,
    );

    const allRegions = await this.prismaService.district.findMany({
      select: {
        name: true,
      },
    });

    const message = {
      description: incidentExists.description,
      risk_scale: incidentExists.risk_scale,
      category: incidentExists.category,
      region: regionIncidents,
    };

    let emergencyServiceExists = null;

    if (emergency_service_name) {
      emergencyServiceExists = await this.usersRepository.findByName(
        emergency_service_name,
      );

      if (!emergencyServiceExists) {
        throw new BadRequestException({
          message: 'Emergency service not exists',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      try {
        const emergencyChannel = emergencyServiceExists.name.replace(/\s/g, '');

        await this.sendNotificationService.sendNotification(
          emergencyChannel,
          message,
        );
      } catch (error) {
        this.logger.error(error);
      }
    }

    if (regionIncidents.length == allRegions.length) {
      try {
        await this.sendNotificationService.sendNotification('Cidade', message);
      } catch (error) {
        this.logger.error(error);
      }
    } else {
      const results = await Promise.all(
        regionIncidents.map(async (region) => {
          const regionChannel = region.replace(/\s/g, '');
          try {
            await this.sendNotificationService.sendNotification(
              regionChannel,
              message,
            );
            return { success: true };
          } catch (error) {
            this.logger.error(error);
            return {
              success: false,
              region: regionChannel,
            };
          }
        }),
      );

      const errorResult = results.find((result) => !result.success);
      if (errorResult) {
        await this.sendNotificationService
          .sendNotification(errorResult.region, message)
          .catch((error) => {
            this.logger.error(error);
          });
      }
    }

    const newIncidentNotification =
      await this.incidentsNotificationRepository.create(
        incident_id,
        emergencyServiceExists?.id,
        user.id,
      );

    if (!newIncidentNotification) {
      throw new BadRequestException({
        message: 'Incident notification not created',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return newIncidentNotification;
  }

  async findAll() {
    return await this.incidentsNotificationRepository.findAll();
  }

  async findOne(id: string) {
    const incidentNotificationFound =
      await this.incidentsNotificationRepository.findById(id);

    if (!incidentNotificationFound) {
      throw new BadRequestException({
        message: 'Incident notification not found',
      });
    }

    return incidentNotificationFound;
  }
}
