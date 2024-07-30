import { UserData } from './UserTypes';

interface BaseResponse {
  status: boolean;
  code: number;
}

export interface ResponseMessage extends BaseResponse {
  message: string;
}

export interface ResponseUser extends ResponseMessage {
  userData: UserData | null;
}
