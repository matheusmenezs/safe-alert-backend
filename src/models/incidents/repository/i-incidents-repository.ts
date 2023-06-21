import { CreateIncidentDto } from '../dto/create-incident.dto';
import { UpdateIncidentDto } from '../dto/update-incident.dto';
import { Incident } from '../entities/incident.entity';

export interface IIncidentsRepository {
  create(data: CreateIncidentDto, user_id: string): Promise<Incident>;
  findById(id: string): Promise<Incident>;
  findAll(): Promise<Incident[]>;
  updateById(id: string, data: UpdateIncidentDto): Promise<Incident>;
  deleteById(id: string): Promise<Incident>;
}
