import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User {
  id: string;
  name: string;
  email: string;
  telephone?: string;

  @Exclude()
  password: string;

  address_id?: string;
  is_active: boolean;
  role: Role;

  created_at: Date;
  updated_at?: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
