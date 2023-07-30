import { z } from 'zod';

export const ContactSchema = z.object({
	id: z.number(),
	name: z.string(),
	phone: z.string(),
	address: z.string().optional(),
	email: z.string().optional(),
	favorite: z.number().default(0),
});

export type Contact = z.infer<typeof ContactSchema>;

export type ContactFilter = {
	name: string | undefined;
	favorite: boolean | undefined;
};
