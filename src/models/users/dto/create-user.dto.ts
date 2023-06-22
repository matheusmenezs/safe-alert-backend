import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  readonly id: string;
  @IsNotEmpty()
  readonly number: string;
  @IsNotEmpty()
  readonly street: string;
  @IsNotEmpty()
  readonly district: string;
  @IsNotEmpty()
  readonly cep: string;

  constructor(partial: Partial<AddressDto>) {
    Object.assign(this, partial);
  }
}

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Username is missing',
  })
  @IsString({
    message: 'Invalid name is format',
  })
  name: string;

  @IsNotEmpty({
    message: 'Email is missing',
  })
  @IsEmail(
    {},
    {
      message: 'Email invalid',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Password is missing',
  })
  @IsString({
    message: 'Invalid password is format',
  })
  password: string;

  @IsOptional()
  @IsString({
    message: 'Invalid telephone is format',
  })
  telephone?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
