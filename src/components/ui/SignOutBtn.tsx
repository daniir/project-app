'use client';
import { signOut } from 'next-auth/react';
import React from 'react';

export const SignOutBtn = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: '/login',
    });
  };

  return (
    <button className="hover:underline" onClick={handleClick}>
      Cerrar sessión
    </button>
  );
};
