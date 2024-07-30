import { userServices } from '@/services';
import type { RegisterUser } from '@/types';

export async function POST(req: Request) {
  const user: RegisterUser = await req.json();

  try {
    const response = await userServices.RegisterUser(user);
    return Response.json(
      {
        response,
      },
      {
        status: response.code,
      }
    );
  } catch (error) {
    console.log({ error });
  }
}
