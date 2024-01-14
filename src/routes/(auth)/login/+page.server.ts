import {prisma} from '$lib/server/prisma';
import {fail, redirect} from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import {email, minLength, object, safeParse, string, toTrimmed} from 'valibot';
import type {Actions} from './$types';

export const actions: Actions = {
	async default(event) {
		const form = await event.request.formData();
		const parsed = safeParse(schema, {
			email: form.get('email'),
			password: form.get('password'),
		});

		if (!parsed.success) {
			return fail(400, {
				success: false,
				message: parsed.issues[0].message,
			});
		}

		const {email, password} = parsed.output;
		const user = await prisma.user.findUnique({
			where: {email},
			select: {
				id: true,
				password: true,
			},
		});

		if (!user) {
			return fail(400, {
				success: false,
				message: 'Invalid username or password',
			});
		}

		const matches = await bcrypt.compare(password, user.password);

		if (!matches) {
			return fail(400, {
				success: false,
				message: 'Invalid username or password',
			});
		}

		event.cookies.set('user', user.id, {path: '/'});
		redirect(303, '/');
	},
};

const schema = object({
	email: string([email('Invalid email')]),
	password: string([
		toTrimmed(),
		minLength(8, 'Password must be 8 or more characters'),
	]),
});
