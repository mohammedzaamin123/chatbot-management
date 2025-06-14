
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Apple-inspired color palette
				apple: {
					blue: '#007AFF',
					'blue-light': '#5AC8FA',
					'blue-dark': '#0051D5',
					gray: {
						50: '#F2F2F7',
						100: '#E5E5EA',
						200: '#D1D1D6',
						300: '#C7C7CC',
						400: '#AEAEB2',
						500: '#8E8E93',
						600: '#636366',
						700: '#48484A',
						800: '#3A3A3C',
						900: '#1C1C1E',
					},
					green: '#34C759',
					orange: '#FF9500',
					red: '#FF3B30',
					purple: '#AF52DE',
					pink: '#FF2D92',
					yellow: '#FFCC00',
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				// Apple-style gradients
				'apple-gradient': 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
				'apple-mesh': 'radial-gradient(at 40% 20%, rgba(0, 122, 255, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(90, 200, 250, 0.15) 0px, transparent 50%)',
			},
			boxShadow: {
				'apple': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
				'apple-lg': '0 4px 12px rgba(0, 0, 0, 0.15)',
				'apple-xl': '0 8px 24px rgba(0, 0, 0, 0.15)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'apple': '12px',
				'apple-lg': '16px',
				'apple-xl': '20px'
			},
			fontFamily: {
				'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
				'sf-mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
				'inter': ['Inter', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'apple-xs': ['11px', '16px'],
				'apple-sm': ['13px', '20px'],
				'apple-base': ['15px', '24px'],
				'apple-lg': ['17px', '28px'],
				'apple-xl': ['19px', '32px'],
				'apple-2xl': ['22px', '36px'],
				'apple-3xl': ['28px', '40px'],
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
