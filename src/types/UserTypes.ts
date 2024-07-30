import { Role } from '@prisma/client';

export interface AccessUser {
  email: string;
  password: string;
}

export interface BaseUser extends AccessUser {
  firstName: string;
  lastName: string;
}

export interface RegisterUser extends BaseUser {
  confirmPassword: string;
}

export interface UserData {
  id: string;
  email: string;
  role: Role;
}
