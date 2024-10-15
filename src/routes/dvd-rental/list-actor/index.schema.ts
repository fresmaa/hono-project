import { z } from 'zod';

export const paramSchema = z.object({
    name: z.string(),
});

export const listActorSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.any(),
});

export const errorSchema = z.object({
    message: z.string(),
    error: z.string(),
    data: z.string(),
    success: z.boolean().default(false),
});