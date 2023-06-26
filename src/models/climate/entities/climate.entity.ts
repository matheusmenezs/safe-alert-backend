export class Climate {
  id: string;
  humidity_min: number;
  humidity_max: number;
  temperature_min: number;
  temperature_max: number;
  rain_precipitation: string;
  rain_probability: string;
  wind_velocity: string;
  wind_direction: string;
  text: string;
  date: string;

  created_at: Date;
  updated_at?: Date;

  constructor(climate: Partial<Climate>) {
    Object.assign(this, climate);
  }
}
