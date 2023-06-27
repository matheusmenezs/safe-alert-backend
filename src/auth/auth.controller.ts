import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NestResponse } from '../core/http/nestResponse';
import { NestResponseBuilder } from '../core/http/nestResponseBuilder';
import { ActiveGuard } from '../guards/active.guard';
import { LocalAuthGuard } from '../guards/local.guard';
import { Role } from '../models/users/enums/role.enum';
import { AuthService } from './auth.service';

export interface IUserRequestData {
  user: {
    id: string;
    email: string;
    role: Role;
    is_active: boolean;
    district_name: string;
  };
}

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ActiveGuard)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() { user }: IUserRequestData): Promise<NestResponse> {
    const token = await this.authService.login(user);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setBody(token)
      .build();

    return response;
  }

  @Get('confirm/:token')
  async receivedConfirmationAccountMail(
    @Param('token') token: string,
  ): Promise<NestResponse> {
    const activeUserResponse =
      await this.authService.receivedConfirmationAccountMail(token);

    const response = new NestResponseBuilder()
      .setStatus(HttpStatus.OK)
      .setHeaders({ Location: `/users/${activeUserResponse.user.id}` })
      .setBody(activeUserResponse)
      .build();

    return response;
  }
}
