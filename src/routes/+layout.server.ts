import {prisma} from '$lib/server/prisma';
import type {LayoutServerLoad} from './$types';

export const load: LayoutServerLoad = async (event) => {
	const id = event.cookies.get('id');
	const user = id ? await prisma.user.findUnique({where: {id}}) : null;

	event.locals.user = user;

	return {user};
};
