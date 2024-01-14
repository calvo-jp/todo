import {prisma} from '$lib/server/prisma';
import {fail, redirect} from '@sveltejs/kit';
import {minLength, object, safeParse, string, toTrimmed} from 'valibot';
import type {Actions} from './$types';

export const actions: Actions = {
	async default(evt) {
		const user = evt.locals.user;

		if (!user) {
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});
		}

		const form = await evt.request.formData();
		const parsed = safeParse(schema, {
			name: form.get('name'),
		});

		if (!parsed.success) {
			return fail(400, {
				success: false,
				message: parsed.issues[0].message,
			});
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

const schema = object({
	name: string([
		toTrimmed(),
		minLength(2, 'Todo must be 2 or more characters'),
	]),
});
