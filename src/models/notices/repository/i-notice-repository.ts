import { Notice } from '@prisma/client';
import { CreateNoticeDto } from '../dto/create-notice.dto';
import { UpdateNoticeDto } from '../dto/update-notice.dto';

export interface INoticeRepository {
  create(data: CreateNoticeDto, user_id: string): Promise<Notice>;
  findById(id: string): Promise<Notice>;
  findAll(): Promise<Notice[]>;
  updateById(id: string, data: UpdateNoticeDto): Promise<Notice>;
  deleteById(id: string): Promise<Notice>;
}
