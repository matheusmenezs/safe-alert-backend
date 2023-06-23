import { IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { NoticeCategory } from '../enums/category.enum';

export class CreateNoticeDto {
  @IsNotEmpty({
    message: 'Category is required',
  })
  @IsEnum(NoticeCategory, {
    message: 'Category must be a valid enum',
  })
  category: NoticeCategory;

  @IsNotEmpty({
    message: 'Title is required',
  })
  @IsString({
    message: 'Description must be a string',
  })
  title: string;

  @IsNotEmpty({
    message: 'Description is required',
  })
  @IsString({
    message: 'Description must be a string',
  })
  description: string;

  @IsEmpty()
  agent_id?: string;
}
