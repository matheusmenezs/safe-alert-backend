import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User {
  id: string;
  name: string;
  email: string;
  telephone?: string;

  @Exclude()
  password: string;

  @Exclude()
  address_id?: string;
  district_name?: string;

  is_active: boolean;
  role: Role;

  created_at: Date;
  updated_at?: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
