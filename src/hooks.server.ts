import {prisma} from '$lib/server/prisma';
import type {Handle} from '@sveltejs/kit';

export const handle: Handle = async ({event, resolve}) => {
	const id = event.cookies.get('user');

	event.locals.user = id ? await prisma.user.findUnique({where: {id}}) : null;

	const response = await resolve(event);
	return response;
};
