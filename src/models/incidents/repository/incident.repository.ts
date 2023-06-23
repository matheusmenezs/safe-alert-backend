import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IIncidentsRepository } from './i-incidents-repository';
import { CreateIncidentDto } from '../dto/create-incident.dto';
import { Incident } from '../entities/incident.entity';
import { UpdateIncidentDto } from '../dto/update-incident.dto';
import { IncidentDistrict } from '@prisma/client';

@Injectable()
export class IncidentsRepository implements IIncidentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    { category, description, risk_scale, status }: CreateIncidentDto,
    user_id: string,
  ): Promise<Incident> {
    const newIncident = await this.prismaService.incident.create({
      data: {
        category,
        description,
        risk_scale,
        status,
        user_id,
      },
    });
    return newIncident;
  }

  async findById(id: string): Promise<Incident> {
    const incidentFound = await this.prismaService.incident.findFirst({
      where: { id },
    });

    return incidentFound;
  }

  async findAll(): Promise<Incident[]> {
    const allIncidents = await this.prismaService.incident.findMany({
      include: {
        IncidentDistrict: {
          include: {
            District: true, // Carrega as informações do distrito relacionado
          },
        },
      },
    });

    const newIncidents = allIncidents.map((incident) => {
      const districts = incident.IncidentDistrict.map(
        (incidentDistrict) => incidentDistrict.District.name,
      );

      return {
        id: incident.id,
        category: incident.category,
        description: incident.description,
        risk_scale: incident.risk_scale,
        status: incident.status,
        user_id: incident.user_id,
        created_at: incident.created_at,
        updated_at: incident.updated_at,
        districts_name: districts,
      };
    });

    return newIncidents;
  }
  async findByDistrict(district_id: string): Promise<IncidentDistrict[]> {
    const incidents = await this.prismaService.incidentDistrict.findMany({
      where: {
        district_id,
      },
    });

    return incidents;
  }

  async findByMe(user_id: string): Promise<Incident[]> {
    const incidentsFound = await this.prismaService.incident.findMany({
      where: { user_id },
    });

    return incidentsFound;
  }

  async updateById(
    id: string,
    { category, description, risk_scale, status }: UpdateIncidentDto,
  ): Promise<Incident> {
    const updatedincident = await this.prismaService.incident.update({
      where: { id },
      data: {
        category,
        description,
        risk_scale,
        status,
      },
    });

    return updatedincident;
  }

  async deleteById(id: string): Promise<Incident> {
    const deletedIncident = await this.prismaService.incident.delete({
      where: { id },
    });

    return deletedIncident;
  }
}
