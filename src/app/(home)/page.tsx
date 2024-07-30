'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Modal, PoliciesHistory, PolicyForm } from '@/components/ui/';
import { Vehicle } from '@/types';
import Loading from './loading';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { data: session } = useSession();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [sequential, setSequential] = useState<number>(0);

  if (!session?.user)
    return (
      <div>
        <Loading />
      </div>
    );

  const getInfo = async () => {
    const resp = await fetch(`/api/info?id=${session.user.id}`);
    const { message } = await resp.json();

    setName(message.name);
    setSequential(message.sequential);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-items-center gap-2 mt-10">
        <div className="bg-gray-200 p-14 rounded-md">
          <h1 className="font-bold">Complete los siguientes campos</h1>
          <PolicyForm
            setVehicle={setVehicle}
            setAmount={setAmount}
            getInfo={getInfo}
            handleModal={handleModal}
          />
        </div>
        <div>
          <h1 className="font-bold text-center">Historial de pólizas</h1>
          <br />
          <PoliciesHistory userId={session.user.id!} check={showModal} />
        </div>
      </div>

      {showModal && (
        <Modal
          handleModal={handleModal}
          vehicule={vehicle!}
          name={name}
          sequential={sequential}
          userId={session.user.id!}
          amount={amount}
        />
      )}
    </>
  );
}
