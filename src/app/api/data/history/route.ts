import { prisma } from '@/lib';

export async function GET() {
  const data = await prisma.policy.findMany({
    select: {
      amount: true,
      vehicle: {
        select: {
          brand: true,
          model: true,
          owner: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return Response.json({
    data,
  });
}
