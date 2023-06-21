import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({
    message: 'Name must be a string',
  })
  name?: string;

  @IsEmail(
    {},
    {
      message: 'Email invalid',
    },
  )
  email?: string;

  @IsString({
    message: 'Password must be a string',
  })
  password?: string;

  @IsString({
    message: 'Phone must be a string',
  })
  telephone?: string;

  @IsEmpty()
  is_active?: boolean;
}
