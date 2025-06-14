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
				// Beautiful pastel colors
				pastel: {
					purple: '#E8D5FF',
					lavender: '#F0E6FF',
					pink: '#FFD6E8',
					peach: '#FFE0CC',
					mint: '#D4F4DD',
					sky: '#CCE7FF',
					cream: '#FFF9E6',
					coral: '#FFE4D6'
				},
				// Enhanced neon colors for dark mode
				neon: {
					purple: '#A855F7',
					yellow: '#FCD34D',
					green: '#34D399',
					magenta: '#F472B6',
					cyan: '#22D3EE',
					orange: '#FB923C'
				},
				// Glass effect colors
				glass: {
					light: 'rgba(255, 255, 255, 0.8)',
					dark: 'rgba(255, 255, 255, 0.1)',
					strong: 'rgba(255, 255, 255, 0.15)'
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				// Light mode gradients
				'light-gradient': 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
				'pastel-gradient': 'linear-gradient(135deg, #E8D5FF 0%, #F0E6FF 25%, #FFD6E8 50%, #D4F4DD 75%, #CCE7FF 100%)',
				// Dark mode gradients
				'neon-gradient': 'linear-gradient(135deg, #A855F7 0%, #F472B6 50%, #34D399 100%)',
				'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
				// Mesh gradients
				'mesh-light': 'radial-gradient(at 40% 20%, #E8D5FF 0px, transparent 50%), radial-gradient(at 80% 0%, #FFD6E8 0px, transparent 50%), radial-gradient(at 0% 50%, #D4F4DD 0px, transparent 50%)',
				'mesh-dark': 'radial-gradient(at 40% 20%, rgba(168, 85, 247, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(244, 114, 182, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(52, 211, 153, 0.3) 0px, transparent 50%)'
			},
			boxShadow: {
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'dreamy': '0 8px 25px -5px rgba(168, 85, 247, 0.3), 0 8px 25px -5px rgba(244, 114, 182, 0.2)',
				'pastel': '0 4px 20px -2px rgba(168, 85, 247, 0.15)',
				'neon': '0 0 20px rgba(168, 85, 247, 0.4)',
				'neon-strong': '0 0 40px rgba(168, 85, 247, 0.6)',
				'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
				'glow': '0 0 20px rgba(52, 211, 153, 0.4)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem'
			},
			fontFamily: {
				'manrope': ['Manrope', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
				'sf-pro': ['SF Pro Display', 'system-ui', 'sans-serif']
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'gradient-shift': {
					'0%, 100%': {
						'background-position': '0% 50%'
					},
					'50%': {
						'background-position': '100% 50%'
					}
				},
				'bounce-soft': {
					'0%, 100%': {
						transform: 'translateY(0)',
						'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(-5px)',
						'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 8s ease infinite',
				'bounce-soft': 'bounce-soft 2s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
