import {prisma} from '$lib/server/prisma';
import type {Prisma} from '@prisma/client';
import {fail, redirect} from '@sveltejs/kit';
import invariant from 'tiny-invariant';
import {nullable, object, parse, string, toTrimmed, transform} from 'valibot';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	invariant(user);

	const {page, size, search} = parse(schema, {
		page: event.url.searchParams.get('page'),
		size: event.url.searchParams.get('size'),
		search: event.url.searchParams.get('search'),
	});

	const {id} = user;

	const where: Prisma.TodoWhereInput = {
		user: {id},

		...(search && {
			AND: {
				name: {
					mode: 'insensitive',
					contains: search,
				},
			},
		}),
	};

	const count = await prisma.todo.count({where});
	const rows = await prisma.todo.findMany({
		skip: size * (page - 1),
		take: size,
		where,
		orderBy: {
			createdAt: 'desc',
		},
	});

	return {
		page,
		size,
		rows,
		count,
		search,
	};
};

const defaultPage = 1;
const defaultSize = 5;

const schema = object({
	page: transform(nullable(string()), (v) => {
		const n = v ? parseInt(v) : defaultPage;
		return Number.isNaN(n) ? defaultPage : n < defaultPage ? defaultPage : n;
	}),
	size: transform(nullable(string()), (v) => {
		const n = v ? parseInt(v) : defaultSize;
		return Number.isNaN(n) ? defaultSize : n < defaultSize ? defaultSize : n;
	}),
	search: nullable(string([toTrimmed()])),
});

export const actions: Actions = {
	async logout(event) {
		event.locals.user = null;
		event.cookies.delete('user', {path: '/'});

		redirect(303, '/login');
	},
	async delete(event) {
		const form = await event.request.formData();
		const id = form.get('id')?.toString();

		if (!event.locals.user) {
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});
		}

		if (!id) {
			return fail(400, {
				success: false,
				message: "Missing 'id'",
			});
		}

		await prisma.todo.delete({where: {id}});

		return {
			success: true,
			message: 'Todo deleted',
		};
	},
	async complete(event) {
		const form = await event.request.formData();
		const id = form.get('id')?.toString();

		if (!event.locals.user) {
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});
		}

		if (!id) {
			return fail(400, {
				success: false,
				message: "Missing 'id'",
			});
		}

		await prisma.todo.update({
			where: {id},
			data: {
				completedAt: new Date(),
			},
		});

		return {
			success: true,
			message: 'Todo marked as complete',
		};
	},
};
