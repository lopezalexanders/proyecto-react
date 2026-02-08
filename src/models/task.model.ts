import { z } from 'zod';

export const schemaTask = z.object({ 
    name: z.string().min(3, 'El nombre de la tarea es obligatorio'),
    done: z.coerce.boolean().default(false) });

export type TaskFormValues = z.infer<typeof schemaTask>;