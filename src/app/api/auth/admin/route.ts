import { prisma } from '@/lib';
import { hashPassword } from '@/utils';
import { Role } from '@prisma/client';

export async function GET() {
  const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD!);

  await prisma.user.create({
    data: {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@email.com',
      password: adminPassword,
      role: Role.Admin,
    },
  });

  return Response.json(
    {
      message: 'Usuario admin creado',
    },
    {
      status: 201,
    }
  );
}
