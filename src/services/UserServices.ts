import { IUserServices } from '.';
import { z } from 'zod';
import { prisma, loginUserSchema, registerUserSchema } from '@/lib';
import { checkPassword, hashPassword } from '@/utils';
import type { ResponseMessage, ResponseUser } from '@/types';

class UserServices implements IUserServices {
  async RegisterUser(
    user: z.infer<typeof registerUserSchema>
  ): Promise<ResponseMessage> {
    const { data, success, error } = registerUserSchema.safeParse(user);

    if (!success) {
      console.log({
        status: success,
        message: error.message,
      });

      return {
        status: success,
        code: 400,
        message: error.message,
      };
    }

    if (data.password !== data.confirmPassword)
      return {
        status: false,
        code: 400,
        message: 'La contraseña no coincide',
      };

    const userExist = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExist)
      return {
        status: false,
        code: 200,
        message: 'El usuario ya existe',
      };

    const hashedPassword = await hashPassword(data.password);

    await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      status: true,
      code: 201,
      message: 'Usuario creado con exito',
    };
  }

  async LoginUser(
    user: z.infer<typeof loginUserSchema>
  ): Promise<ResponseUser> {
    const { data, success, error } = loginUserSchema.safeParse(user);

    if (!success)
      return {
        status: success,
        code: 400,
        message: error.message,
        userData: null,
      };

    const userExist = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!userExist)
      return {
        status: false,
        code: 404,
        message: 'Usuario no encontrado',
        userData: null,
      };

    if (!(await checkPassword(data.password, userExist.password)))
      return {
        status: false,
        code: 404,
        message:
          'Correo o Contraseña son incorrectos, intente de nuevo por favor',
        userData: null,
      };

    const { password: _, ...rest } = userExist;

    return {
      status: true,
      code: 200,
      message: 'Sesión iniciada',
      userData: {
        id: rest.id,
        email: rest.email,
        role: rest.role,
      },
    };
  }

  async GetUserNames(id: string): Promise<ResponseMessage> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user)
      return {
        status: false,
        code: 404,
        message: 'Usuario no encontrado',
      };

    return {
      status: true,
      code: 200,
      message: user.firstName + ' ' + user.lastName,
    };
  }
}

export const userServices = new UserServices();
