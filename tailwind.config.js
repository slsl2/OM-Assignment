/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-text": "linear-gradient(to right, #F893DC, #84A8FF)"
			},
			textFillColor: {
				"gradient-text": "transparent"
			},
			backgroundClip: {
				text: "text"
			}
		}
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities(
				{
					".bg-clip-text": {
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent"
					}
				},
				["responsive", "hover"]
			);
		}
	]
};
