import { BasePolicy, PolicySummary } from './PolicyType';

export interface Vehicle extends BasePolicy {
  brand: string;
  model: string;
  year: number;
}

export interface RegisterVehicule extends Vehicle, PolicySummary {
  ownerId: string;
}
