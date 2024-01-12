import {prisma} from '$lib/server/prisma';
import {fail, redirect} from '@sveltejs/kit';
import bcrypt, {genSalt} from 'bcrypt';
import {email, minLength, object, safeParse, string, toTrimmed} from 'valibot';
import type {PageServerLoad} from '../$types';
import type {Actions} from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) throw redirect(303, '/');
};

export const actions: Actions = {
	async default(event) {
		const form = await event.request.formData();

		const values = {
			name: form.get('name'),
			email: form.get('email'),
			password: form.get('password'),
		};

		const parsed = safeParse(schema, values);

		if (!parsed.success) {
			return fail(400, {
				error: parsed.issues[0].message,
				values,
			});
		}

		try {
			const user = await prisma.user.create({
				data: {
					...parsed.output,
					password: await bcrypt.hash(parsed.output.password, await genSalt(8)),
				},
			});

			event.locals.user = user;
			event.cookies.set('user', user.id, {path: '/'});

			throw redirect(303, '/');
		} catch {
			return fail(400, {
				error: 'Validation error',
				values,
			});
		}
	},
};

const schema = object({
	name: string([toTrimmed(), minLength(4)]),
	email: string([email()]),
	password: string([minLength(8)]),
});
