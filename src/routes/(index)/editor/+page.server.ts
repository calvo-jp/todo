import {prisma} from '$lib/server/prisma';
import {redirect} from '@sveltejs/kit';
import {minLength, object, safeParse, string, toTrimmed} from 'valibot';
import type {Actions} from './$types';

export const actions: Actions = {
	async default(evt) {
		const user = evt.locals.user;

		if (!user) {
			return {
				error: 'Not authorized',
			};
		}

		const form = await evt.request.formData();

		const values = {
			name: form.get('name'),
		};

		const parsed = safeParse(schema, values);

		if (!parsed.success) {
			return {
				error: parsed.issues[0].message,
				values,
			};
		}

		await prisma.todo.create({
			data: {
				name: parsed.output.name,
				userId: user.id,
			},
		});

		redirect(303, '/');
	},
};

const schema = object({name: string([toTrimmed(), minLength(2)])});
