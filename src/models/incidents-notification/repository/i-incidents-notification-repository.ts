import { CreateIncidentsNotificationDto } from '../dto/create-incidents-notification.dto';
import { IncidentsNotification } from '../entities/incidents-notification.entity';

export interface IIncidentsNotificationRepository {
  create(
    data: CreateIncidentsNotificationDto,
    user_id: string,
  ): Promise<IncidentsNotification>;
  findById(id: string): Promise<IncidentsNotification>;
  findAll(): Promise<IncidentsNotification[]>;
}
