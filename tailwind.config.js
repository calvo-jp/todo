import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["'Lato'", ...defaultTheme.fontFamily.sans],
				mono: ["'Fira Code'", ...defaultTheme.fontFamily.mono],
			},
		},
	},
	plugins: [],
};
