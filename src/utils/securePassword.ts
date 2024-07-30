import bcryp from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  return bcryp.hash(password, 10);
};

export const checkPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return bcryp.compare(password, hashPassword);
};
