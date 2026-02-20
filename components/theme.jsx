export const matchaTheme = {
	colors: {
		matchaBg: '#95BD86',
		babyGreen: '#C6DCBA',
		matchaDeep: '#5D7B43',
		charcoalDark: '#1A1C1A',
		offWhite: '#F8FAF5',
		pureWhite: '#FFFFFF',
	},
	radius: {
		squish: '2rem',
		bubble: '9999px',
	},
	shadow: {
		windowSep: '0 25px 50px -12px rgba(26, 28, 26, 0.15)',
		cardPop: '0 15px 30px -5px rgba(26, 28, 26, 0.1), inset 0 -4px 0 rgba(0,0,0,0.05)',
		neonGlow: '0 0 15px 2px rgba(198, 220, 186, 0.6), 0 0 30px 5px rgba(198, 220, 186, 0.4)',
	},
	fontFamily: 'Fredoka, sans-serif',
}

export const matchaThemeVars = {
	'--matcha-bg': matchaTheme.colors.matchaBg,
	'--baby-green': matchaTheme.colors.babyGreen,
	'--matcha-deep': matchaTheme.colors.matchaDeep,
	'--charcoal-dark': matchaTheme.colors.charcoalDark,
	'--off-white': matchaTheme.colors.offWhite,
	'--pure-white': matchaTheme.colors.pureWhite,
	'--radius-squish': matchaTheme.radius.squish,
	'--radius-bubble': matchaTheme.radius.bubble,
	'--shadow-window-sep': matchaTheme.shadow.windowSep,
	'--shadow-card-pop': matchaTheme.shadow.cardPop,
	'--shadow-neon-glow': matchaTheme.shadow.neonGlow,
}
