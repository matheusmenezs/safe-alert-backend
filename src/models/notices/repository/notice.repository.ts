import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { INoticeRepository } from './i-notice-repository';
import { CreateNoticeDto } from '../dto/create-notice.dto';
import { Notice } from '@prisma/client';
import { UpdateNoticeDto } from '../dto/update-notice.dto';

@Injectable()
export class NoticeRepository implements INoticeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    { category, description, title }: CreateNoticeDto,
    agent_id: string,
  ): Promise<Notice> {
    const newNotice = await this.prismaService.notice.create({
      data: {
        category,
        description,
        title,
        agent_id,
      },
    });
    return newNotice;
  }

  async findById(id: string): Promise<Notice> {
    const noticeFound = await this.prismaService.notice.findFirst({
      where: { id },
    });

    return noticeFound;
  }

  async findAll(): Promise<Notice[]> {
    const allIncidents = await this.prismaService.notice.findMany();

    return allIncidents;
  }

  async findByMe(agent_id: string): Promise<Notice[]> {
    const incidentsFound = await this.prismaService.notice.findMany({
      where: { agent_id },
    });

    return incidentsFound;
  }

  async updateById(
    id: string,
    { category, description }: UpdateNoticeDto,
  ): Promise<Notice> {
    const updatedincident = await this.prismaService.notice.update({
      where: { id },
      data: {
        category,
        description,
      },
    });

    return updatedincident;
  }

  async deleteById(id: string): Promise<Notice> {
    const deletedIncident = await this.prismaService.notice.delete({
      where: { id },
    });

    return deletedIncident;
  }
}
