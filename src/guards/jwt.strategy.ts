import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/models/users/repository/user.repository';

export interface IJwtPayload {
  sub: string;
  role: string;
  district_name: string;
  is_active: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_TOKEN_KEY,
    });
  }

  async validate(token: IJwtPayload) {
    try {
      const { id, role, is_active } = await this.usersRepository.findById(
        token.sub,
      );

      if (!id || !role || !is_active) {
        throw new UnauthorizedException('Invalid user');
      }

      return {
        id,
        role,
        is_active,
        district_name: token.district_name,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
