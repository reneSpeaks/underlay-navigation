export const NAV_EL = {
	toggle: "toggle",
	menu: "menu",
	main: "main",
	overlay: "overlay",
	dark: "dark",
	menuBorder: "menu-border",
	label: "label",
	corner: "corner",
	border: "border",
	burgerOuter: "burger-outer",
	burgerMiddle: "burger-middle",
	revealL: "reveal-l",
	revealS: "reveal-s",
} as const;

export type NavKey = keyof typeof NAV_EL;

export const navMark = (key: NavKey) => ({ "data-nav": NAV_EL[key] });

export const navSelector = (key: NavKey) => `[data-nav="${NAV_EL[key]}"]`;
