import { z } from 'zod';
import { prisma, vehicleSchemaApi } from '@/lib';
import { IVehicleService } from '@/services';
import { ResponseMessage, RegisterVehicule } from '@/types';
import { policyServices } from './PolicyServices';

class VehicleService implements IVehicleService {
  async CreateVehicle(vehicle: RegisterVehicule): Promise<ResponseMessage> {
    const vehiculeData = await prisma.vehicle.create({
      data: {
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        ownerId: vehicle.ownerId,
      },
    });

    const { id: vehicleId } = vehiculeData;

    await policyServices.CreatePolicy({
      policyNumber: vehicle.policyNumber,
      vehiculePrice: vehicle.vehiculePrice,
      insuranceType: vehicle.insuranceType,
      coverage: vehicle.coverage,
      amount: vehicle.amount,
      vehicleId,
    });

    return {
      status: true,
      code: 201,
      message: 'Póliza guardada correctamente',
    };
  }

  async GetVehiclePolicies(id: string): Promise<ResponseMessage> {
    const vehiclePolicies = await prisma.vehicle.findMany({
      select: {
        model: true,
        policy: {
          select: {
            createdAt: true,
            amount: true,
          },
        },
      },
      where: {
        ownerId: id,
      },
    });

    return {
      status: true,
      code: 200,
      message: JSON.stringify(vehiclePolicies),
    };
  }
}

export const vehicleService = new VehicleService();
