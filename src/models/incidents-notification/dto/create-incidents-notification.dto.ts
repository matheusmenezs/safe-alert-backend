import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateIncidentsNotificationDto {
  @IsEmpty()
  agent_id?: string;

  @IsNotEmpty()
  @IsString({
    message: 'Incident id must be a string',
  })
  incident_id: string;

  @IsOptional()
  @IsString({
    message: 'Emergency service name must be a string',
  })
  emergency_service_name?: string;
}
