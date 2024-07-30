'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUserSchema } from '@/lib';
import { AccessUser } from '@/types';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccessUser>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit: SubmitHandler<AccessUser> = async (data) => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    reset();
    router.push('/');
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-white my-2.5 text-center" htmlFor="email">
          Correo
        </label>
        <input
          className="rounded-md p-1.5"
          type="email"
          id="email"
          placeholder="usuario@correo.com"
          {...register('email')}
        />
        {errors.email?.message && (
          <p className="text-red-500">{errors.email.message}</p>
        )}

        <label className="text-white my-2.5 text-center" htmlFor="password">
          Contraseña
        </label>
        <input
          className="rounded-md p-1.5"
          type="password"
          id="password"
          {...register('password')}
        />
        {errors.password?.message && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          className="bg-teal-600 my-6 p-3 rounded-md text-white inline-block hover:bg-teal-700"
          type="submit"
        >
          Iniciar Sesión
        </button>

        <Link
          className="text-center text-blue-500 hover:underline"
          href="/register"
        >
          Registrarse
        </Link>
      </form>
    </>
  );
};
