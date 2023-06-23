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
  Query,
} from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { NestResponse } from 'src/core/http/nestResponse';
import { NestResponseBuilder } from 'src/core/http/nestResponseBuilder';
import { IUserRequestData } from 'src/auth/auth.controller';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Role } from '../users/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Incidents')
@UseGuards(RolesGuard)
@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createIncidentDto: CreateIncidentDto,
    @Req() { user }: IUserRequestData,
  ): Promise<NestResponse> {
    const newIncident = await this.incidentsService.create(
      createIncidentDto,
      user.id,
    );
    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({ Location: `/incidents/${newIncident.id}` })
      .setBody(newIncident)
      .build();

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.AGENT)
  @Get()
  findAll() {
    const incidents = this.incidentsService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(incidents)
      .build();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.AGENT)
  @Get('/by-district')
  findByDistrict(@Query('district_name') district_name: string) {
    const incidents = this.incidentsService.findByDistrict(district_name);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(incidents)
      .build();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async findMe(@Req() { user }: IUserRequestData): Promise<NestResponse> {
    const userFound = await this.incidentsService.findByMe(user.id);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(userFound)
      .build();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return this.incidentsService.update(id, updateIncidentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.AGENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentsService.remove(id);
  }
}
