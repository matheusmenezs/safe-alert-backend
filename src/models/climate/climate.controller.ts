import {
  Controller,
  Get,
  Body,
  Query,
  UseGuards,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ClimateService } from './climate.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { NestResponse } from 'src/core/http/nestResponse';
import { NestResponseBuilder } from 'src/core/http/nestResponseBuilder';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

export interface CityData {
  localeId: string[];
}

@Controller('climate')
export class ClimateController {
  constructor(private readonly climateService: ClimateService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.AGENT)
  @Put('registerCity')
  async registerCity(@Body() cityData: CityData): Promise<NestResponse> {
    const cityRegistered = this.climateService.registerCityId(cityData);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(cityRegistered)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.AGENT)
  @Get('/findCity')
  async findCityId(
    @Query() params: { city: string; abbreviated_state: string },
  ): Promise<NestResponse> {
    const cityFound = await this.climateService.findCityId(
      params?.city,
      params?.abbreviated_state,
    );

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(cityFound)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/forecastByDate')
  async findByDate(): Promise<NestResponse> {
    const forecast = await this.climateService.findByDate();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(forecast)
      .build();

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.AGENT)
  @Get()
  async findAll(): Promise<NestResponse> {
    const climates = await this.climateService.findAll();

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(climates)
      .build();

    return response;
  }
}
