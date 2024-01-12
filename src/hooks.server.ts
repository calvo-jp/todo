import {prisma} from '$lib/server/prisma';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {SvelteKitAuth} from '@auth/sveltekit';
import type {Handle} from '@sveltejs/kit';

export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [],
	pages: {
		error: '/login',
		signIn: '/login',
		signOut: '/login',
	},
}) satisfies Handle;
