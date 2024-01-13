import {prisma} from '$lib/server/prisma';
import {fail, redirect} from '@sveltejs/kit';
import {minLength, object, safeParse, string, toTrimmed} from 'valibot';
import type {PageServerLoad} from '../$types';
import type {Actions} from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) throw redirect(303, '/login');
};

export const actions: Actions = {
	async default(evt) {
		const user = evt.locals.user;

		if (!user) {
			return {
				error: 'Not authorized',
			};
		}

		const form = await evt.request.formData();
		const name = form.get('name');
		const data = safeParse(
			object({name: string([toTrimmed(), minLength(2)])}),
			{name},
		);

		if (!data.success) {
			return {
				error: data.issues[0].message,
				values: {
					name,
				},
			};
		}

		try {
			await prisma.todo.create({
				data: {
					name: data.output.name,
					userId: user.id,
				},
			});
		} catch (e) {
			return fail(400, {
				error: 'Something went wrong',
				values: {
					name,
				},
			});
		}

		redirect(303, '/');
	},
};
