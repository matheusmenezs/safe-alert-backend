import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { StatusIncident } from '../enums/status.enum';
import { IncidentCategory } from '../enums/category.enum';

export class CreateIncidentDto {
  @IsNotEmpty({
    message: 'Category is required',
  })
  @IsEnum(IncidentCategory, {
    message: 'Category must be a valid enum',
  })
  category: IncidentCategory;

  @IsNotEmpty({
    message: 'Description is required',
  })
  @IsString({
    message: 'Description must be a string',
  })
  description: string;

  @IsOptional()
  risk_scale: number;

  @IsEnum(StatusIncident, {
    message: 'Status must be a valid enum',
  })
  @IsOptional()
  status: StatusIncident;

  district_names?: string[];

  @IsEmpty()
  user_id?: string;
}
