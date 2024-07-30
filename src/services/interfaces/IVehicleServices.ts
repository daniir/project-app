import { ResponseMessage, RegisterVehicule } from '@/types';

export interface IVehicleService {
  CreateVehicle: (vehicle: RegisterVehicule) => Promise<ResponseMessage>;
  GetVehiclePolicies: (id: string) => Promise<ResponseMessage>;
}
