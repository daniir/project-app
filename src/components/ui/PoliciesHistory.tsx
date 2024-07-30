'use client';

import { PolicyHistory } from '@/types';
import { dateTimeConvert } from '@/utils';
import { useState, useEffect } from 'react';

type Props = {
  userId: string;
  check: boolean;
};

export const PoliciesHistory = ({ userId, check }: Props) => {
  const [policiesData, setPoliciesData] = useState<PolicyHistory[]>([]);

  useEffect(() => {
    const getPolicyHistory = async () => {
      const response = await fetch(`/api/data/${userId}`);
      const { data } = await response.json();
      setPoliciesData(data);
    };

    getPolicyHistory();
  }, [userId, check]);

  return (
    <div>
      {policiesData.length < 1 ? (
        <p className="text-center font-bold">No hay pólizas generadas</p>
      ) : (
        policiesData.map((el, i) => (
          <div className="border my-2 rounded-md p-5 shadow-md" key={i}>
            <p className="font-bold">
              Fecha de creación:{' '}
              <span className="font-normal">
                {dateTimeConvert(el.policy.createdAt)}
              </span>
            </p>
            <p className="font-bold capitalize">
              Vehículo: <span className="font-normal">{el.model}</span>
            </p>
            <p className="font-bold">
              Monto: <span className="font-normal">${el.policy.amount}</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};
