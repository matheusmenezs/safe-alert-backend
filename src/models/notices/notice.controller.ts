import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nestResponse';
import { NestResponseBuilder } from 'src/core/http/nestResponseBuilder';
import { IUserRequestData } from 'src/auth/auth.controller';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Role } from '../users/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@ApiTags('Notices')
@UseGuards(RolesGuard)
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticeService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.AGENT, Role.EMERGENCY)
  @Post()
  async create(
    @Body() createNoticeDto: CreateNoticeDto,
    @Req() { user }: IUserRequestData,
  ): Promise<NestResponse> {
    const newIncident = await this.noticesService.create(
      createNoticeDto,
      user.id,
    );
    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({ Location: `/notices/${newIncident.id}` })
      .setBody(newIncident)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.noticesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async findMe(@Req() { user }: IUserRequestData): Promise<NestResponse> {
    const noticeFound = await this.noticesService.findByMe(user.id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(noticeFound)
      .build();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const noticeFound = await this.noticesService.findOne(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(noticeFound)
      .build();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    return await this.noticesService.update(id, updateNoticeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.AGENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.noticesService.remove(id);
  }
}
