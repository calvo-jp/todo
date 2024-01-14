import {prisma} from '$lib/server/prisma';
import {fail, redirect} from '@sveltejs/kit';
import bcrypt, {genSalt} from 'bcrypt';
import {email, minLength, object, safeParse, string, toTrimmed} from 'valibot';
import type {Actions} from './$types';

export const actions: Actions = {
	async default(event) {
		const form = await event.request.formData();
		const parsed = safeParse(schema, {
			name: form.get('name'),
			email: form.get('email'),
			password: form.get('password'),
		});

		if (!parsed.success) {
			return fail(400, {
				success: false,
				message: parsed.issues[0].message,
			});
		}

		const {name, email, password} = parsed.output;

		if (await prisma.user.exists({email})) {
			return fail(400, {
				success: false,
				message: 'Email already in use',
			});
		}

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: await bcrypt.hash(password, await genSalt(8)),
			},
		});

		event.locals.user = user;
		event.cookies.set('user', user.id, {path: '/'});

		redirect(303, '/');
	},
};

const schema = object({
	name: string([toTrimmed(), minLength(4)]),
	email: string([email()]),
	password: string([minLength(8)]),
});
