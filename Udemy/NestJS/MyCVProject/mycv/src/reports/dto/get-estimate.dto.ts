import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @Min(1930)
  @Max(2100)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  longitude: number;

  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;
}
