'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { coverage, insuranceType } from '@/utils';
import { vehicleSchema } from '@/lib';
import { Vehicle } from '@/types';

type Props = {
  setVehicle: Dispatch<SetStateAction<Vehicle | null>>;
  setAmount: Dispatch<SetStateAction<number>>;
  handleModal: () => void;
  getInfo: () => Promise<void>;
};

export const PolicyForm = ({
  setVehicle,
  setAmount,
  handleModal,
  getInfo,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Vehicle>({
    resolver: zodResolver(vehicleSchema),
  });

  const onSubmit: SubmitHandler<Vehicle> = async (data) => {
    await getInfo();

    const amount =
      (data.vehiculePrice / (new Date().getFullYear() - data.year)) * 0.35;

    setVehicle({
      brand: data.brand,
      model: data.model,
      year: data.year,
      vehiculePrice: data.vehiculePrice,
      coverage: data.coverage,
      insuranceType: data.insuranceType,
    });
    setAmount(amount);

    reset();
    handleModal();
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="my-2.5 text-center" htmlFor="brand">
          Marca
        </label>
        <input
          className="border rounded-md text-center p-1"
          type="text"
          id="brand"
          {...register('brand')}
        />
        {errors.brand?.message && (
          <p className="text-red-500">{errors.brand.message}</p>
        )}

        <label className="my-2.5 text-center" htmlFor="model">
          Modelo
        </label>
        <input
          className="border rounded-md text-center p-1"
          type="text"
          id="model"
          {...register('model')}
        />
        {errors.model?.message && (
          <p className="text-red-500">{errors.model.message}</p>
        )}

        <label className="my-2.5 text-center" htmlFor="year">
          Año
        </label>
        <input
          className="border rounded-md text-center p-1"
          type="number"
          id="year"
          {...register('year')}
        />
        {errors.year?.message && (
          <p className="text-red-500">{errors.year.message}</p>
        )}

        <label className="my-2.5 text-center" htmlFor="vehiculePrice">
          Costo
        </label>
        <input
          className="border rounded-md text-center p-1"
          type="number"
          id="vehiculePrice"
          {...register('vehiculePrice')}
        />
        {errors.vehiculePrice?.message && (
          <p className="text-red-500">{errors.vehiculePrice.message}</p>
        )}

        <label className="my-2.5 text-center" htmlFor="insuranceType">
          Tipo de seguro
        </label>
        <select
          className="border rounded-md text-center p-1"
          id="insuranceType"
          {...register('insuranceType')}
        >
          {insuranceType.map((el, i) => (
            <option key={i} value={el.value} disabled={el.disable}>
              {el.name}
            </option>
          ))}
        </select>
        {errors.insuranceType?.message && (
          <p className="text-red-500">{errors.insuranceType.message}</p>
        )}

        <label className="my-2.5 text-center" htmlFor="coverage">
          Covertura
        </label>
        <select
          className="border rounded-md text-center p-1"
          id="coverage"
          {...register('coverage')}
        >
          {coverage.map((el, i) => (
            <option key={i} value={el.value} disabled={el.disable}>
              {el.name}
            </option>
          ))}
        </select>
        {errors.coverage?.message && (
          <p className="text-red-500">{errors.coverage.message}</p>
        )}

        <button
          className="bg-cyan-600 rounded-md text-white mt-5 p-2.5"
          type="submit"
        >
          Generar cotización
        </button>
      </form>
    </>
  );
};
