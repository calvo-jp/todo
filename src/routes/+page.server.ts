import {prisma} from '$lib/server/prisma';
import type {Prisma} from '@prisma/client';
import {redirect} from '@sveltejs/kit';
import {nullable, object, parse, string, toTrimmed, transform} from 'valibot';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	const {page, size, search} = parse(schema, {
		page: event.url.searchParams.get('page'),
		size: event.url.searchParams.get('size'),
		search: event.url.searchParams.get('search'),
	});

	if (!user) return redirect(303, '/login');

	const {id} = user;

	const where: Prisma.TodoWhereInput = {
		user: {id},

		...(search && {
			AND: {
				name: {
					contains: search,
				},
			},
		}),
	};

	const total = await prisma.todo.count({where});
	const rows = await prisma.todo.findMany({
		skip: size * (page - 1),
		take: size,
		where,
	});

	return {
		page,
		size,
		rows,
		total,
		search,
	};
};

const schema = object({
	page: transform(nullable(string()), (v) => {
		const n = v ? parseInt(v) : 1;

		return Number.isNaN(n) ? 1 : n < 1 ? 1 : n;
	}),
	size: transform(nullable(string()), (v) => {
		const n = v ? parseInt(v) : 10;

		return Number.isNaN(n) ? 10 : n < 10 ? 10 : n;
	}),
	search: nullable(string([toTrimmed()])),
});

export const actions: Actions = {
	async logout(event) {
		console.log('Hello');

		event.locals.user = null;
		event.cookies.delete('user', {path: '/'});

		redirect(303, '/login');
	},
};
