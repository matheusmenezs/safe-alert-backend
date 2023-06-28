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
import { SendMailService } from 'src/mail/send-mail.service';
import { SendNotificationService } from 'src/notifications/send-notification.service';

@Injectable()
export class IncidentsNotificationService {
  constructor(
    private readonly incidentsNotificationRepository: IncidentsNotificationRepository,
    private readonly usersRepository: UsersRepository,
    private readonly incidentRepository: IncidentsRepository,
    private readonly sendEmailService: SendMailService,
    private readonly sendNotificationService: SendNotificationService,
  ) {}

  private readonly logger = new Logger();

  async create(
    { emergency_service_id, incident_id }: CreateIncidentsNotificationDto,
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

    if (emergency_service_id) {
      const emergencyServiceExists = await this.usersRepository.findById(
        emergency_service_id,
      );

      if (!emergencyServiceExists) {
        throw new BadRequestException({
          message: 'Emergency service not exists',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
    }

    const regionIncidents = await this.incidentRepository.findRegionIncident(
      incident_id,
    );

    const message = {
      description: incidentExists.description,
      risk_scale: incidentExists.risk_scale,
      category: incidentExists.category,
      region: regionIncidents,
    };

    const results = await Promise.all(
      regionIncidents.map(async (region) => {
        const regionFormatted = region.replace(/\s/g, '');
        try {
          await this.sendNotificationService.sendNotification(
            regionFormatted,
            message,
          );
          return { success: true };
        } catch (error) {
          this.logger.error(error);
          return {
            success: false,
            region: regionFormatted,
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

    const newIncidentNotification =
      await this.incidentsNotificationRepository.create(
        { incident_id, emergency_service_id },
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
