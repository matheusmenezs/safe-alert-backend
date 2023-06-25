import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { SetRoleDto } from '../dto/set-role-dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { IUsersRepository } from './i-users-repository';
import { Address } from '@prisma/client';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    email,
    name,
    password,
    telephone,
    address,
  }: CreateUserDto): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
        telephone,
        address_id: address?.id,
      },
    });
    return newUser;
  }

  async findById(id: string): Promise<User> {
    const userFound = await this.prismaService.user.findFirst({
      where: { id },
    });

    return userFound;
  }

  async findByEmail(email: string): Promise<User> {
    const userFound = await this.prismaService.user.findFirst({
      where: { email },
    });

    return userFound;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.prismaService.user.findMany({
      where: { is_active: true },
    });

    return allUsers;
  }

  async findUsersByDistrictNames(districtNames: string[]): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      where: {
        address: {
          district: {
            in: districtNames,
          },
        },
      },
    });

    return users;
  }

  async findMyAddress(id: string): Promise<Address> {
    const userFound = await this.prismaService.user.findFirst({
      where: { id },
      include: {
        address: true,
      },
    });

    return userFound.address;
  }

  async updateById(
    id: string,
    { name, email, password, is_active }: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        is_active,
      },
    });

    return updatedUser;
  }

  async updateByEmail(
    email: string,
    { email: newEmail, password }: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { email },
      data: {
        email: newEmail,
        password,
      },
    });

    return updatedUser;
  }

  async setRoleById(id: string, { role }: SetRoleDto): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        role,
      },
    });

    return updatedUser;
  }

  async deleteById(id: string): Promise<User> {
    const deletedUser = await this.prismaService.user.delete({
      where: { id },
    });

    return deletedUser;
  }

  async findByName(name: string): Promise<User> {
    const userFound = await this.prismaService.user.findFirst({
      where: { name },
    });

    return userFound;
  }
}
