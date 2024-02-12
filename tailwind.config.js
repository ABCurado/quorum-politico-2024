export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	darkMode: ['class', '[data-mode="dark"]'],
	plugins: [
		require('tailwindcss-hero-patterns'),
		require('flowbite/plugin')
	],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				PCP: '#1d4ed8',
				BE: '#dc2626',
				L: '#a3e635',
				PAN: '#22c55e',
				IL: '#0ea5e9',
				PS: '#db2777',
				PSD: '#ea580c',
				CH: '#1e1b4b'
			  },
		},
		fontFamily: {
			body: [],
			sans: []
		},
		backdropBlur: {
			'none': '0',
			'blur': 'blur(40px)',
		}
	}
};
