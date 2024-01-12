import type {LayoutServerLoad} from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	const authenticated = Boolean(session);

	event.locals.authenticated = authenticated;

	return {session};
};
