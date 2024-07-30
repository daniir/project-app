import { number, object, string, enum as enum_ } from 'zod';

export const registerUserSchema = object({
  firstName: string().min(3, {
    message: 'El nombre debe ser de 3 caracteres minimo',
  }),
  lastName: string().min(3, {
    message: 'El apellido debe ser de 3 caracteres minimo',
  }),
  email: string({ message: 'El correo es requerido' }).email({
    message: 'Dirección de correo invalida',
  }),
  password: string({ required_error: 'La contraseña es requerida' }).min(4, {
    message: 'La contraseña debe ser de mínimo 4 carácteres',
  }),
  confirmPassword: string({
    required_error: 'La confirmación de contraseña es requerida',
  }).min(4, { message: 'La contraseña debe ser de mínimo 4 carácteres' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'La contraseña debe ser igual',
  path: ['confirmPassword'],
});

export const loginUserSchema = object({
  email: string().email({
    message: 'Dirección de correo invalida',
  }),
  password: string().min(1, { message: 'La contraseña es requerida' }),
});

export const vehicleSchema = object({
  brand: string().min(1, {
    message: 'La marca es requerido',
  }),
  model: string().min(1, {
    message: 'El modeo es requerido',
  }),
  year: string().refine((year) => !isNaN(parseFloat(year)), {
    message: 'Solo se permiten valores numericos',
  }),
  vehiculePrice: string().refine((year) => !isNaN(parseFloat(year)), {
    message: 'Solo se permiten valores numericos',
  }),
  insuranceType: enum_(['Terceros', 'Completo'], {
    errorMap: () => ({
      message: 'Por favor seleccione un tipo de seguro indicado en la lista',
    }),
  }),
  coverage: enum_(['ResponsabilidadCivil', 'Limitada', 'Amplia'], {
    errorMap: () => ({
      message: 'Por favor seleccione un tipo de cobertura indicado en la lista',
    }),
  }),
});

export const vehicleSchemaApi = object({
  brand: string().min(1, {
    message: 'La marca es requerido',
  }),
  model: string().min(1, {
    message: 'El modeo es requerido',
  }),
  year: string().refine((year) => !isNaN(parseInt(year)), {
    message: 'Solo se permiten valores numericos',
  }),
  vehiculePrice: string().refine((year) => !isNaN(parseFloat(year)), {
    message: 'Solo se permiten valores numericos',
  }),
  insuranceType: enum_(['Terceros', 'Completo'], {
    errorMap: () => ({
      message: 'Por favor seleccione un tipo de seguro indicado en la lista',
    }),
  }),
  coverage: enum_(['ResponsabilidadCivil', 'Limitada', 'Amplia'], {
    errorMap: () => ({
      message: 'Por favor seleccione un tipo de cobertura indicado en la lista',
    }),
  }),
  amount: string().refine((amount) => !isNaN(parseFloat(amount)), {
    message: 'Solo se permiten valores numericos',
  }),
  policyNumber: string().refine(
    (policyNumber) => !isNaN(parseInt(policyNumber)),
    {
      message: 'Solo se permiten valores numericos',
    }
  ),
  ownerId: string().min(1, {
    message: 'El propietario del vehículo es requerido',
  }),
});
