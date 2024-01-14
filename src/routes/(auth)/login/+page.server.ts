import {prisma} from '$lib/server/prisma';
import {fail, redirect} from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import {email, minLength, object, safeParse, string, toTrimmed} from 'valibot';
import type {Actions} from './$types';

export const actions: Actions = {
	async default(event) {
		const form = await event.request.formData();

		const values = {
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

		const {email, password} = parsed.output;
		const user = await prisma.user.findUnique({where: {email}});

		if (!user) {
			return fail(400, {
				error: 'Invalid username or password',
				values,
			});
		}

		const matches = await bcrypt.compare(password, user.password);

		if (!matches) {
			return fail(400, {
				error: 'Invalid username or password',
				values,
			});
		}

		event.locals.user = user;
		event.cookies.set('user', user.id, {path: '/'});

		redirect(303, '/');
	},
};

const schema = object({
	email: string([email()]),
	password: string([toTrimmed(), minLength(8)]),
});
