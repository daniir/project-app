import {
  RegisterUser,
  ResponseMessage,
  ResponseUser,
  AccessUser,
} from '@/types';

export interface IUserServices {
  RegisterUser: (user: RegisterUser) => Promise<ResponseMessage>;
  LoginUser: (user: AccessUser) => Promise<ResponseUser>;
  GetUserNames: (id: string) => Promise<ResponseMessage>;
}
