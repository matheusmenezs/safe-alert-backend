import { PartialType } from '@nestjs/mapped-types';
import { CreateClimateDto } from './create-climate.dto';

export class UpdateClimateDto extends PartialType(CreateClimateDto) {
  updated_at: Date;
}
