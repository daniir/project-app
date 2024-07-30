import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-top-color:transparent"></div>
      <p className="ml-2">cargando...</p>
    </div>
  );
}
