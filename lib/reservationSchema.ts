import { z } from 'zod';

/**
 * Reservation Form Schema - Zod 校验规则
 * 用于 react-hook-form + zodResolver
 */
export const reservationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  date: z
    .string()
    .min(1, 'Please select a date'),

  guests: z
    .string()
    .min(1, 'Please select number of guests')
    .refine((val) => {
      const num = parseInt(val, 10);
      return num >= 1 && num <= 12;
    }, 'Party size must be between 1 and 12'),

  notes: z
    .string()
    .max(500, 'Notes cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
});

/**
 * TypeScript 类型推导
 * 从 schema 自动生成类型
 */
export type ReservationFormData = z.infer<typeof reservationSchema>;
