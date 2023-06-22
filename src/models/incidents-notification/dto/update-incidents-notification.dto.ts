import { PartialType } from '@nestjs/mapped-types';
import { CreateIncidentsNotificationDto } from './create-incidents-notification.dto';

export class UpdateIncidentsNotificationDto extends PartialType(
  CreateIncidentsNotificationDto,
) {}
