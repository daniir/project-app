export interface PolicyInfo {
  amount: string;
  vehicle: VehicleInfo;
}

export interface VehicleInfo {
  brand: string;
  model: string;
  owner: Owner;
}

export interface Owner {
  firstName: string;
  lastName: string;
}
