import {prisma} from '$lib/server/prisma';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {SvelteKitAuth} from '@auth/sveltekit';
import GoogleProvider from '@auth/sveltekit/providers/google';
import type {Handle} from '@sveltejs/kit';

export const handle = SvelteKitAuth(async () => {
	return {
		adapter: PrismaAdapter(prisma),
		providers: [GoogleProvider],
		pages: {
			error: '/login',
			signIn: '/login',
			signOut: '/login',
		},
	};
}) satisfies Handle;
