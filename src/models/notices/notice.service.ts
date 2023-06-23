import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/repository/user.repository';
import { PrismaService } from 'prisma/prisma.service';
import { NoticeRepository } from './repository/notice.repository';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { SendMailService } from 'src/mail/send-mail.service';

@Injectable()
export class NoticeService {
  constructor(
    private readonly noticeRepository: NoticeRepository,
    private readonly usersRepository: UsersRepository,
    private readonly prismaService: PrismaService,
    private readonly sendMailService: SendMailService,
  ) {}

  async create(
    { category, description, title }: CreateNoticeDto,
    user_id: string,
  ) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User not found',
      });
    }

    const newNotice = await this.noticeRepository.create(
      { category, description, title },
      user_id,
    );

    if (!newNotice) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Notice not created',
      });
    }

    await this.sendMailService.sendNoticeMail({
      email: user.email,
      name: user.name,
      category,
      description,
      title,
    });

    return newNotice;
  }

  async findAll() {
    const allNotices = await this.noticeRepository.findAll();

    return allNotices;
  }

  async findOne(id: string) {
    const noticeFound = await this.noticeRepository.findById(id);

    if (!noticeFound) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Notice not found',
      });
    }

    return noticeFound;
  }

  async findByMe(user_id: string) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User not found',
      });
    }

    const noticeFound = await this.noticeRepository.findByMe(user_id);

    if (!noticeFound) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Notice not found',
      });
    }

    return noticeFound;
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto) {
    const noticeFound = await this.noticeRepository.findById(id);

    if (!noticeFound) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Notice not found',
      });
    }

    const updatedNotice = await this.noticeRepository.updateById(
      id,
      updateNoticeDto,
    );

    return updatedNotice;
  }

  async remove(id: string) {
    const noticeFound = await this.noticeRepository.findById(id);

    if (!noticeFound) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'notice not found',
      });
    }

    const deletedNotice = await this.noticeRepository.deleteById(id);

    return deletedNotice;
  }
}
