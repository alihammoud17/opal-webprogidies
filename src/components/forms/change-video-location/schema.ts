import { z } from 'zod';

export const moveVideoSchema = z.object({
    folder_id: z.string().optional(),
    workspac_id: z.string(),
});