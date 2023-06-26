import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CityData } from './climate.controller';
import { ClimateRepository } from './repository/climate.repository';
import { CreateClimateDto } from './dto/create-climate.dto';
import { Climate } from '@prisma/client';

interface CityInfo {
  id: number;
  name: string;
  state: string;
  country: string;
}

interface Forecast {
  id: number;
  name: string;
  state: string;
  country: string;
  meteogram: string;
  data: Array<any>;
}

@Injectable()
export class ClimateService {
  constructor(private readonly climateRepository: ClimateRepository) {}

  async findCityId(city: string, abbreviated_state: string) {
    const urlCityFind = `${process.env.API_CLIMATE_URL}/locale/city?name=${city}&state=${abbreviated_state}&country=BR&token=${process.env.API_CLIMATE_TOKEN}`;

    const urlEncoded = encodeURI(urlCityFind);

    const cityInfo: CityInfo = await axios
      .get(urlEncoded)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new HttpException(err.response.data, err.response.status);
      });

    return cityInfo;
  }

  async registerCityId(cityData: CityData) {
    const urlRegisterCity = `${process.env.API_CLIMATE_MANAGER}/user-token/${process.env.API_CLIMATE_TOKEN}/locales`;

    const cityRegistered = await axios
      .put(urlRegisterCity, cityData)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new HttpException(err.response.data, err.response.status);
      });

    return cityRegistered;
  }

  async findAll() {
    const climateFound = await this.climateRepository.findAll();

    return climateFound;
  }

  async findByDate() {
    const newDate = new Date();
    const currentDate = newDate.toLocaleDateString('pt-BR');

    newDate.setDate(newDate.getDate() + 1);
    const nextDate = newDate.toLocaleDateString('pt-BR');

    const climateExists: Climate[] =
      await this.climateRepository.findClimateByDate([currentDate, nextDate]);

    const climateNextExists = climateExists.some(
      (climate) => climate.date === nextDate,
    );

    if (climateNextExists) {
      return climateExists;
    }

    const urlForecast = `${process.env.API_CLIMATE_URL}/forecast/locale/${process.env.REGION_ID}/days/15?token=${process.env.API_CLIMATE_TOKEN}`;

    const forecast: Forecast = await axios
      .get(urlForecast)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new HttpException(err.response.data, err.response.status);
      });

    const filteredForecasts = forecast.data.filter(
      (forecast) =>
        forecast.date_br === currentDate || forecast.date_br === nextDate,
    );

    const formattedForecasts: Promise<Climate>[] = filteredForecasts.map(
      async (forecast) => {
        const forecasts: CreateClimateDto = {
          date: forecast.date_br,
          humidity_max: forecast.humidity?.max,
          humidity_min: forecast.humidity?.min,
          rain_precipitation: forecast.rain?.precipitation,
          rain_probability: forecast.rain?.probability,
          temperature_max: forecast.temperature?.max,
          temperature_min: forecast.temperature?.min,
          wind_direction: forecast.wind?.direction,
          wind_velocity: forecast.wind?.velocity_avg,
          text: forecast.text_icon?.text.pt,
        };

        const climateRegistered = await this.climateRepository.registerClimate(
          forecasts,
        );

        return climateRegistered;
      },
    );

    return Promise.all(formattedForecasts);
  }
}
