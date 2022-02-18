module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1280px',
      },
    },
    fontSize: {
      xs: 'var(--fs-xs)',
      sm: 'var(--fs-sm)',
      base: 'var(--fs-base)',
      lg: 'var(--fs-lg)',
      xl: 'var(--fs-xl)',
      '2xl': 'var(--fs-2xl)',
      '3xl': 'var(--fs-3xl)',
      '4xl': 'var(--fs-4xl)',
      '5xl': 'var(--fs-5xl)',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    extend: {
      colors: {
        primary: {
          500: 'var(--primary-hover-color)',
          900: 'var(--primary-color)',
        },
        secondary: {
          500: 'var(--secondary-hover-color)',
          900: 'var(--secondary-color)',
        },
        tertiary: {
          500: 'var(--tertiary-hover-color)',
          900: 'var(--tertiary-color)',
        },
        border: {
          500: 'var(--border-color)',
          900: 'var(--border-hover-color)',
        },
        background: 'var(--background-color)',
        'background-darker': 'var(--background-darker-color)',
        text: 'var(--text-color)',
        heading: 'var(--heading-color)',
        divider: 'var(--divider-color)',
      },
      height: {
        header: 'var(--header-height)',
        'header-sticky': 'var(--header-sticky-height)',
        footer: 'var(--footer-height)',
      },
      minHeight: {
        header: 'var(--header-height)',
        'header-sticky': 'var(--header-sticky-height)',
        footer: 'var(--footer-height)',
      },
      animation: {
        'slide-up': 'slide-up 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-down': 'slide-down 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        'slide-up': {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'slide-down': {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(100%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
