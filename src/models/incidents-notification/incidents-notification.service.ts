import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIncidentsNotificationDto } from './dto/create-incidents-notification.dto';
import { IUserRequestData } from 'src/auth/auth.controller';
import { UsersRepository } from '../users/repository/user.repository';
import { IncidentsNotificationRepository } from './repository/incident-notification.repository';
import { IncidentsNotification } from './entities/incidents-notification.entity';
import { IncidentsRepository } from '../incidents/repository/incident.repository';

@Injectable()
export class IncidentsNotificationService {
  constructor(
    private readonly incidentsNotificationRepository: IncidentsNotificationRepository,
    private readonly usersRepository: UsersRepository,
    private readonly incidentRepository: IncidentsRepository,
  ) {}

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
