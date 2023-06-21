import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { IncidentsRepository } from './repository/incident.repository';
import { UsersRepository } from '../users/repository/user.repository';
import { StatusIncident } from './enums/status.enum';
import { Role } from '../users/enums/role.enum';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class IncidentsService {
  constructor(
    private readonly incidentsRepository: IncidentsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    {
      category,
      description,
      risk_scale,
      district_name,
      status,
    }: CreateIncidentDto,
    user_id: string,
  ) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User not found',
      });
    }

    if (user.role === Role.AGENT) {
      status = StatusIncident.REGISTERED;
    }

    const newIncident = await this.incidentsRepository.create(
      { category, description, risk_scale, status },
      user_id,
    );

    const district = await this.prismaService.district.findFirst({
      where: {
        name: district_name,
      },
    });

    if (district) {
      await this.prismaService.incidentDistrict.create({
        data: {
          incident_id: newIncident.id,
          district_id: district.id,
        },
      });
    }

    return newIncident;
  }

  findAll() {
    const allIncidents = this.incidentsRepository.findAll();

    if (!allIncidents) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Incidents not found',
      });
    }

    return allIncidents;
  }

  findOne(id: string) {
    const incidentFound = this.incidentsRepository.findById(id);

    if (!incidentFound) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Incident not found',
      });
    }

    return incidentFound;
  }

  async findByMe(user_id: string) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User not found',
      });
    }

    const incidentFound = await this.incidentsRepository.findByMe(user_id);

    return incidentFound;
  }

  update(id: string, updateIncidentDto: UpdateIncidentDto) {
    const incidentFound = this.incidentsRepository.findById(id);

    if (!incidentFound) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Incident not found',
      });
    }

    const updatedIncident = this.incidentsRepository.updateById(
      id,
      updateIncidentDto,
    );

    return updatedIncident;
  }

  remove(id: string) {
    const incidentFound = this.incidentsRepository.findById(id);

    if (!incidentFound) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Incident not found',
      });
    }

    const deletedIncident = this.incidentsRepository.deleteById(id);

    return deletedIncident;
  }
}
