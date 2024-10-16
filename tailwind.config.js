/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',  // Adjust to match the files where you're using Tailwind classes
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1E3A8A',  // A custom dark blue (you can use any HEX code)
          secondary: '#3B82F6',  // A custom lighter blue
          accent: '#FBBF24',  // A custom yellow accent color
          neutral: '#F3F4F6',  // Light gray background color
          textPrimary: '#111827',  // Dark gray for text
          textSecondary: '#6B7280',  // Lighter gray for secondary text
        },
        fontFamily: {
          body: ['Roboto', 'sans-serif'],  // Fixed font for the body
          heading: ['Poppins', 'sans-serif'],  // Font for headings
        },
      },
    },
    plugins: [],
  }
  