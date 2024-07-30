import { Coverage, InsuranceType } from '@prisma/client';

export interface BasePolicy {
  vehiculePrice: number;
  insuranceType: InsuranceType;
  coverage: Coverage;
}

export interface PolicySummary extends BasePolicy {
  policyNumber: number;
  amount: number;
}

export interface Policy extends BasePolicy, PolicySummary {
  vehicleId: string;
}

export interface PolicyHistory {
  model: string;
  policy: {
    createdAt: Date;
    amount: number;
  };
}
