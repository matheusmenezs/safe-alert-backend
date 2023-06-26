export class CreateClimateDto {
  humidity_min: number;
  humidity_max: number;
  temperature_min: number;
  temperature_max: number;
  rain_precipitation: number;
  rain_probability: number;
  wind_velocity: number;
  wind_direction: string;
  text: string;
  date: string;
}
