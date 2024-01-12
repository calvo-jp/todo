import {prisma} from '$lib/prisma';
import type {Prisma} from '@prisma/client';
import {redirect} from '@sveltejs/kit';
import {nullable, object, parse, string, toTrimmed, transform} from 'valibot';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();

	const {page, size, search} = parse(schema, {
		page: event.url.searchParams.get('page'),
		size: event.url.searchParams.get('size'),
		search: event.url.searchParams.get('search'),
	});

	if (!session) throw redirect(303, '/login');

	const where: Prisma.TodoWhereInput = {
		user: {
			id: session.user?.id,
		},

		...(search && {
			title: {
				contains: search,
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
