module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2BA88C',
        'primary-dark': '#22856F',
        secondary: '#1E5A52',
        accent: '#D4AF37',
        success: '#2BA88C',
        warning: '#D4AF37',
        error: '#EF4444',
        gray: {
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
          600: '#4B5563',
          500: '#8F8290',
          400: '#9CA3AF',
          300: '#D1D5DB',
          200: '#E5E7EB',
          100: '#F3F4F6',
        },
      },
    },
  },
};
