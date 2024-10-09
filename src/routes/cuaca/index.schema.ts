import { z } from 'zod';

export const weatherSchema = z.object({
    city: z.string()
        .openapi({
        param: {
            name: 'city',
            in: 'path',
        },
        type: 'string',
        example: 'Jakarta',
        }),
});



export const defaultResponseSchema = z.object({
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