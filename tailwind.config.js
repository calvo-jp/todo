import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				body: ["'Source Sans 3'", ...defaultTheme.fontFamily.sans],
				heading: ["'Titillium Web'", ...defaultTheme.fontFamily.sans],
			},
			data: {
				selected: 'selected',
			},
		},
	},
	plugins: [],
};
