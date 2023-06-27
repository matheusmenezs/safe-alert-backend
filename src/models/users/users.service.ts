import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EncryptData } from '../../utils/encrypt-data';
import { AuthService } from '../../auth/auth.service';
import { AddressDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './repository/user.repository';
import { SetRoleDto } from './dto/set-role-dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
    private readonly encryptData: EncryptData,
    private readonly prismaService: PrismaService,
  ) {}

  async create({
    name,
    email,
    password,
    telephone,
    address,
  }: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User already exists',
      });
    }

    let newAddress: AddressDto;

    if (address) {
      newAddress = await this.prismaService.address.create({
        data: address,
      });
    }

    const newUser = await this.usersRepository.create({
      name,
      email,
      password,
      telephone,
      address: newAddress,
    });

    this.authService.sendConfirmationAccountMail({
      id: newUser.id,
      email,
      username: name,
    });

    return new User(newUser);
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.usersRepository.findAll();

    return allUsers.map((user) => new User(user));
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    const userAddr = await this.usersRepository.findMyAddress(id);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    const userWithDistrict = {
      ...user,
      district_name: userAddr?.district,
    };

    return new User(userWithDistrict);
  }

  async findAllEmergencyServices(): Promise<User[]> {
    const allEmergencyServices =
      await this.usersRepository.findAllEmergencyServices();

    return allEmergencyServices.map((user) => new User(user));
  }

  async update(
    id: string,
    { name, email, password }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    const updatedUser = await this.usersRepository.updateById(id, {
      name,
      email,
      password: password && password,
    });

    return new User(updatedUser);
  }

  async remove(id: string): Promise<User> {
    try {
      const deletedUser = await this.usersRepository.deleteById(id);

      return new User(deletedUser);
    } catch (error) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }
  }

  async setRole(id: string, { role }: SetRoleDto): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    const updatedUser = await this.usersRepository.setRoleById(id, {
      role,
    });

    return new User(updatedUser);
  }
}
