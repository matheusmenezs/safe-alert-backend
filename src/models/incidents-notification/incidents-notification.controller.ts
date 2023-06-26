import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { IncidentsNotificationService } from './incidents-notification.service';
import { CreateIncidentsNotificationDto } from './dto/create-incidents-notification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { IUserRequestData } from 'src/auth/auth.controller';
import { NestResponseBuilder } from 'src/core/http/nestResponseBuilder';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@ApiTags('incidents-notification')
@Controller('incidents-notification')
export class IncidentsNotificationController {
  constructor(
    private readonly incidentsNotificationService: IncidentsNotificationService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles(Role.AGENT)
  async create(
    @Body() createIncidentsNotificationDto: CreateIncidentsNotificationDto,
    @Req() { user }: IUserRequestData,
  ) {
    const incidentNotification = await this.incidentsNotificationService.create(
      createIncidentsNotificationDto,
      { user },
    );
    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({
        Location: `/incidents-notification/${incidentNotification.id}`,
      })
      .setBody(incidentNotification)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.AGENT)
  @Get()
  async findAll() {
    const allNotifications = await this.incidentsNotificationService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(allNotifications)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.AGENT)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const notificationFound = this.incidentsNotificationService.findOne(id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(notificationFound)
      .build();

    return response;
  }
}
