/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.clip-glass': {
                    'clip-path': 'polygon(20% 0%, 80% 0%, 100% 15%, 100% 100%, 0% 100%, 0% 15%)',
                },
            });
        },
    ],
} 