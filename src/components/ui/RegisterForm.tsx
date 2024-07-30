'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUserSchema } from '@/lib';
import { RegisterUser } from '@/types';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUser>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit: SubmitHandler<RegisterUser> = async (data) => {
    await fetch('/api/auth/user', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    reset();
    router.push('/login');
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-white my-2.5 text-center" htmlFor="firstName">
          Nombre
        </label>
        <input
          className="rounded-md p-1.5"
          type="text"
          id="firstName"
          {...register('firstName')}
        />
        {errors.firstName?.message && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}

        <label className="text-white my-2.5 text-center" htmlFor="lastName">
          Apellido
        </label>
        <input
          className="rounded-md p-1.5"
          type="text"
          id="lastName"
          {...register('lastName')}
        />
        {errors.lastName?.message && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}

        <label className="text-white my-2.5 text-center" htmlFor="email">
          Correo
        </label>
        <input
          className="rounded-md p-1.5"
          type="email"
          id="email"
          {...register('email')}
          placeholder="usuario@correo.com"
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

        <label
          className="text-white my-2.5 text-center"
          htmlFor="confirmPassword"
        >
          Confirmar contraseña
        </label>
        <input
          className="rounded-md p-1.5"
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword?.message && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        <button
          className="bg-teal-600 my-6 p-3 rounded-md text-white inline-block hover:bg-teal-700"
          type="submit"
        >
          Registrar
        </button>

        <Link
          className="text-center text-blue-500 hover:underline"
          href="/login"
        >
          Iniciar sesión
        </Link>
      </form>
    </>
  );
};