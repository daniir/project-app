import { prisma } from '@/lib';
import { Policy } from '@/types';

class PolicyServices {
  async CreatePolicy(policy: Policy) {
    await prisma.policy.create({
      data: {
        policyNumber: policy.policyNumber,
        vehiclePrice: policy.vehiculePrice,
        insuranceType: policy.insuranceType,
        coverage: policy.coverage,
        amount: policy.amount,
        vehicleId: policy.vehicleId,
      },
    });
  }
}

export const policyServices = new PolicyServices();
