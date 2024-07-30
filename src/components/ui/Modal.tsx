'use client';

import { RegisterVehicule, Vehicle } from '@/types';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  vehicule: Vehicle;
  name: string;
  sequential: number;
  userId: string;
  amount: number;
  handleModal: () => void;
};

export const Modal = ({
  vehicule,
  name,
  sequential,
  userId,
  amount,
  handleModal,
}: Props) => {
  const { brand, model, year, vehiculePrice, insuranceType, coverage } =
    vehicule;

  const handleClick = async () => {
    const vehicleData: RegisterVehicule = {
      brand,
      model,
      year: +year,
      ownerId: userId,
      policyNumber: sequential,
      vehiculePrice: +vehiculePrice,
      insuranceType,
      coverage,
      amount,
    };

    const resp = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    });

    const { message } = await resp.json();
    handleModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-14 rounded-md w-[600px] flex flex-col justify-center items-center">
        <p className="capitalize font-bold">
          Número de póliza: <span className="font-normal">{sequential}</span>
        </p>
        <p className="capitalize font-bold">
          Nombre: <span className="font-normal">{name}</span>
        </p>
        <p className="capitalize font-bold">
          Modelo: <span className="font-normal">{model}</span>
        </p>
        <p className="capitalize font-bold">
          Año: <span className="font-normal">{year}</span>
        </p>
        <p className="capitalize font-bold">
          Monto: <span className="font-normal">${amount.toFixed(2)}</span>
        </p>
        <button
          className="mt-6 bg-cyan-600 rounded-md text-white p-2"
          onClick={handleClick}
        >
          Guardar póliza
        </button>
      </div>
    </div>
  );
};
