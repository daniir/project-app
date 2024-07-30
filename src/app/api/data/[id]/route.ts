import { vehicleService } from '@/services';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const data = await vehicleService.GetVehiclePolicies(id);

  return Response.json({
    data: JSON.parse(data.message),
  });
}
