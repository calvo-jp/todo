import {prisma} from '$lib/server/prisma';
import {fail} from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import {email, minLength, object, safeParse, string, toTrimmed} from 'valibot';
import type {Actions} from './$types';

export const actions: Actions = {
	async default(event) {
		const user = event.locals.user;

		if (!user) {
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});
		}

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

		const {id} = user;
		const {name, email, password} = parsed.output;

		if (email !== user.email && (await prisma.user.exists({email}))) {
			return {
				success: false,
				message: 'Email already in use',
			};
		}

		await prisma.user.update({
			data: {
				name,
				email,
				password: await bcrypt.hash(password, await bcrypt.genSalt(8)),
			},
			where: {id},
			select: {
				id: true,
			},
		});

		return {
			success: true,
			message: 'Account updated',
		};
	},
};

const schema = object({
	name: string([toTrimmed(), minLength(4)]),
	email: string([email()]),
	password: string([minLength(8)]),
});
