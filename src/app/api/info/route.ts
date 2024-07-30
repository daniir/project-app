import { sequentialServices, userServices } from '@/services';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id)
    return Response.json(
      {
        message: 'El id es obligatorio',
      },
      {
        status: 200,
      }
    );

  try {
    const name = await userServices.GetUserNames(id);

    if (!name.status)
      return Response.json(
        {
          message: name.message,
        },
        {
          status: name.code,
        }
      );

    const sequential = await sequentialServices.GenerateSequence();
    return Response.json(
      {
        message: {
          name: name.message,
          sequential,
        },
      },
      {
        status: name.code,
      }
    );
  } catch (error) {
    console.log({ error });
  }
}
