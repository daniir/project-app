import { vehicleService } from '@/services';
import { RegisterVehicule } from '@/types';

export async function GET() {
  return Response.json(
    {
      message: 'Hola Mundo',
    },
    {
      status: 200,
    }
  );
}

export async function POST(req: Request) {
  const vehicle: RegisterVehicule = await req.json();

  try {
    const response = await vehicleService.CreateVehicle(vehicle);
    return Response.json(
      {
        message: response.message,
      },
      {
        status: response.code,
      }
    );
  } catch (error) {
    console.log({ error });
    return Response.json({
      error,
    });
  }
}
