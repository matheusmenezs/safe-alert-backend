import { Role } from '../../models/users/enums/role.enum';

export class LoginUserDto {
  id: string;
  role: Role;
  is_active: boolean;
}
