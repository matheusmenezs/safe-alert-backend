import { IncidentsNotification } from '../entities/incidents-notification.entity';

export interface IIncidentsNotificationRepository {
  create(
    incident_id: string,
    emergency_service_id: string,
    user_id: string,
  ): Promise<IncidentsNotification>;
  findById(id: string): Promise<IncidentsNotification>;
  findAll(): Promise<IncidentsNotification[]>;
}
