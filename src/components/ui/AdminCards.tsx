'use client';

import { PolicyInfo } from '@/types';
import { useEffect, useState } from 'react';

export const AdminCards = () => {
  const [data, setData] = useState<PolicyInfo[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/data/history');
      const { data } = await response.json();

      setData(data);
    };

    getData();
  }, []);

  return (
    <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
      {data.length < 1 ? (
        <p className="text-red-500">No hay pólizas registradas</p>
      ) : (
        data.map((el, i) => (
          <div className="border my-2 rounded-md p-5 shadow-md w-full" key={i}>
            <p className="font-bold">
              Propietario:{' '}
              <span className="font-normal">
                {el.vehicle.owner.firstName + ' ' + el.vehicle.owner.lastName}
              </span>
            </p>
            <p className="font-bold capitalize">
              Marca: <span className="font-normal">{el.vehicle.brand}</span>
            </p>
            <p className="font-bold capitalize">
              Modelo: <span className="font-normal">{el.vehicle.model}</span>
            </p>
            <p className="font-bold">
              Monto: <span className="font-normal">${el.amount}</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};
