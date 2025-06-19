
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
				// Apple-inspired colors
				apple: {
					blue: '#007AFF',
					gray: {
						50: '#F9F9F9',
						100: '#F2F2F2',
						200: '#E5E5E5',
						300: '#D1D1D1',
						400: '#A1A1A1',
						500: '#6D6D6D',
						600: '#515151',
						700: '#3A3A3A',
						800: '#2A2A2A',
						900: '#1D1D1F'
					}
				},
				// Pastel colors for metrics
				pastel: {
					purple: {
						50: '#F3F1FF',
						100: '#E9E5FF',
						200: '#D6CCFF',
						300: '#B8A7FF',
						400: '#9678FF',
						500: '#7C3AED'
					},
					green: {
						50: '#F0FDF4',
						100: '#DCFCE7',
						200: '#BBF7D0',
						300: '#86EFAC',
						400: '#4ADE80',
						500: '#22C55E'
					},
					blue: {
						50: '#EFF6FF',
						100: '#DBEAFE',
						200: '#BFDBFE',
						300: '#93C5FD',
						400: '#60A5FA',
						500: '#3B82F6'
					},
					pink: {
						50: '#FDF2F8',
						100: '#FCE7F3',
						200: '#FBCFE8',
						300: '#F9A8D4',
						400: '#F472B6',
						500: '#EC4899'
					}
				}
			},
			fontFamily: {
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				'jakarta': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
				'sf-pro': ['SF Pro Display', 'system-ui', 'sans-serif'],
				'sf-text': ['SF Pro Text', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
