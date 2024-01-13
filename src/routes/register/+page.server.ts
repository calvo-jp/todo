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

		const {name, email, password} = parsed.output;

		if (await prisma.user.exists({email})) {
			return fail(400, {
				error: 'Email already in use',
				values,
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
