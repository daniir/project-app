import { ISequentialServices } from './';
import { prisma } from '@/lib/';

class SequentialServices implements ISequentialServices {
  async GenerateSequence(): Promise<number> {
    const { currentNumber } = await prisma.sequential.upsert({
      where: {
        id: 1,
      },
      update: {
        currentNumber: { increment: 1 },
      },
      create: {
        currentNumber: 1,
      },
    });

    return currentNumber;
  }
}

export const sequentialServices = new SequentialServices();
