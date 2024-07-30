import { auth } from '@/auth';
import { AdminCards } from '@/components/ui';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user || session?.user.role !== 'Admin')
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <h2 className="text-red-500 font-bold text-5xl">
          Acceso restringuido para administradores
        </h2>
      </div>
    );

  return (
    <div>
      <h1 className="font-bold my-4 text-center text-5xl">
        Listado de pólizas
      </h1>
      <hr />
      <AdminCards />
    </div>
  );
}
