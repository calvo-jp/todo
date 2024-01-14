import {prisma} from '$lib/server/prisma';
import bcrypt from 'bcrypt';
import {
	email,
	minLength,
	nullable,
	object,
	safeParse,
	string,
	toTrimmed,
	transform,
} from 'valibot';
import type {Actions} from './$types';

export const actions: Actions = {
	async default(event) {
		const user = event.locals.user;

		if (!user) {
			return {
				success: false,
				message: 'Not authorized',
			};
		}

		const form = await event.request.formData();
		const values = {
			name: form.get('name'),
			email: form.get('email'),
			password: form.get('password'),
		};

		const parsed = safeParse(schema, values);

		if (!parsed.success) {
			return {
				success: false,
				message: parsed.issues[0].message,
				meta: {values},
			};
		}

		const {name, email, password} = parsed.output;

		if (await prisma.user.exists({email, AND: {id: {not: user.id}}})) {
			return {
				success: false,
				message: 'Email already in use',
				meta: {values},
			};
		}

		await prisma.user.update({
			data: {
				name,
				email,
				password: password
					? await bcrypt.hash(password, await bcrypt.genSalt(8))
					: undefined,
			},
			where: {
				id: user.id,
			},
		});

		return {
			success: true,
			message: 'Account updated',
		};
	},
};

const schema = object({
	name: transform(nullable(string([toTrimmed(), minLength(4)])), (v) => {
		return v ? v : undefined;
	}),
	email: transform(nullable(string([email()])), (v) => {
		return v ? v : undefined;
	}),
	password: transform(nullable(string([minLength(8)])), (v) => {
		return v ? v : undefined;
	}),
});
