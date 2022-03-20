module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './page-components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '536px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1280px',
      },
    },
    fontFamily: {
      quicksand: 'var(--ff-quicksand)',
      roboto: 'var(--ff-roboto)',
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
          500: 'var(--primary-500)',
          900: 'var(--primary-900)',
        },
        secondary: {
          500: 'var(--secondary-500)',
          900: 'var(--secondary-900)',
        },
        tertiary: {
          500: 'var(--tertiary-500)',
          900: 'var(--tertiary-900)',
        },
        gray: {
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
        },
        topic: {
          100: 'var(--topic-background)',
          900: 'var(--topic-border)',
        },
        message: {
          100: 'var(--message-100)',
          900: 'var(--message-900)',
        },
      },
      width: {
        checkbox: 'var(--checkbox-size)',
        'switch-toggle': 'var(--switch-toggle-size)',
        switch: 'calc(var(--switch-toggle-size) * 2)',
      },
      height: {
        header: 'var(--header-height)',
        checkbox: 'var(--checkbox-size)',
        'switch-toggle': 'var(--switch-toggle-size)',
      },
      zIndex: {
        negative: 'var(--z-negative)',
        elevate: 'var(--z-elevate)',
        sticky: 'var(--z-sticky)',
        drawer: 'var(--z-drawer)',
        dropdown: 'var(--z-dropdown)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
      },
      animation: {
        'slide-up': 'slide-up 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-down': 'slide-down 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        flash: '0.25s ease 0s 2 normal none running flash',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        flash: {
          '50%': {
            opacity: 0.3,
          },
        },
        pulse: {
          '50%': {
            opacity: 0.5,
          },
        },
      },
    },
    animation: {
      'dash-loading': 'dash 1.5s ease-in-out infinite',
      'rotate-loading': 'rotate 2s linear infinite',
    },
    keyframes: {
      rotate: {
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      dash: {
        '0%': {
          strokeDasharray: '1, 150',
          strokeDashoffset: '0',
        },
        '50%': {
          strokeDasharray: '90, 150',
          strokeDashoffset: '-35',
        },
        '100%': {
          strokeDasharray: '90, 150',
          strokeDashoffset: '-124',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
