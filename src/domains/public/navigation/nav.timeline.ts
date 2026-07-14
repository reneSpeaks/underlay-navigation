import gsap from "gsap";
import { navSelector, type NavKey } from "@/domains/public/navigation/nav.elements";
import { prefersReducedMotion } from "@/shared/utils/prefers-reduced-motion";
import "@/domains/public/navigation/custom.gsap.config";

export const one = (key: NavKey) => document.querySelector<HTMLElement>(navSelector(key));
const all = (key: NavKey) => gsap.utils.toArray<HTMLElement>(navSelector(key));

export function buildNavTimeline(): { tl: gsap.core.Timeline; enterEnd: number } | null {
	const toggleBtn = one("toggle");
	const menuEl = one("menu");
	const mainEl = one("main");
	const overlayEl = one("overlay");
	if (!toggleBtn || !menuEl || !mainEl || !overlayEl) return null;

	const toggleLabels = all("label");
	const darkEl = one("dark");
	const corners = all("corner");
	const borders = all("border");
	const largeItems = all("revealL");
	const smallItems = all("revealS");
	const menuBorder = one("menuBorder");
	const burgerOuter = all("burgerOuter");
	const burgerMiddle = all("burgerMiddle");

	const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	const getMenuOffset = () => -menuEl.offsetWidth;

	gsap.set(darkEl, { autoAlpha: 0 });
	gsap.set(mainEl, { x: 0 });
	gsap.set(toggleLabels, { yPercent: 0 });
	gsap.set(menuBorder, { scaleX: 0, transformOrigin: "left center" });
	gsap.set(borders[0], { yPercent: -100 });
	gsap.set(borders[1], { yPercent: 100 });
	gsap.set(corners, { scale: 0 });
	gsap.set(overlayEl, { visibility: "visible" });

	const reduce = prefersReducedMotion();
	const m = (n: number) => (reduce ? 0 : n);

	const tl = gsap.timeline({ paused: true, defaults: { ease: "energy" } });

	tl.to([mainEl, overlayEl], { x: getMenuOffset, duration: m(0.7) }, 0)
		.to(darkEl, { autoAlpha: 1, duration: m(0.5) }, 0)
		.to(corners, { scale: 1, duration: m(0.5) }, 0)
		.to(borders, { yPercent: 0, duration: m(0.5) }, 0)
		.to(toggleLabels, { yPercent: -100, duration: m(0.4) }, 0)
		.to(toggleBtn, { color: () => cssVar("--background"), duration: m(0.4) }, 0)
		.to(burgerOuter, { strokeDasharray: "90 207", strokeDashoffset: -134, duration: m(0.6), ease: "burger" }, 0)
		.to(burgerMiddle, { strokeDasharray: "1 60", strokeDashoffset: -30, duration: m(0.6), ease: "burger" }, 0)
		.fromTo(largeItems, { autoAlpha: 0, xPercent: 25 }, { autoAlpha: 1, xPercent: 0, duration: m(0.7), stagger: m(0.05) }, 0)
		.fromTo(
			smallItems,
			{ autoAlpha: 0, yPercent: 100 },
			{ autoAlpha: 1, yPercent: 0, duration: m(0.5), stagger: m(0.03), ease: "power3.out" },
			m(0.3),
		)
		.to(menuBorder, { scaleX: 1, duration: m(0.5) }, "<");

	const enterEnd = tl.duration();
	tl.addPause();

	tl.to([largeItems, smallItems], { autoAlpha: 0, duration: m(0.3) }, "<")
		.to([mainEl, overlayEl], { x: 0, duration: m(0.6) }, "<")
		.to(darkEl, { autoAlpha: 0, duration: m(0.35), ease: "power2.inOut" }, "<")
		.to(corners, { scale: 0, duration: m(0.5) }, "<")
		.to(borders[0], { yPercent: -100, duration: m(0.5) }, "<")
		.to(borders[1], { yPercent: 100, duration: m(0.5) }, "<")
		.to(toggleBtn, { color: () => cssVar("--foreground"), duration: m(0.25) }, `<+=${m(0.1)}`)
		.to(toggleLabels, { yPercent: 0, duration: m(0.25), ease: "power3.in" }, "<")
		.to(burgerOuter, { strokeDasharray: "60 207", strokeDashoffset: 0, duration: m(0.6), ease: "burger" }, "<")
		.to(burgerMiddle, { strokeDasharray: "60 60", strokeDashoffset: 0, duration: m(0.6), ease: "burger" }, "<");

	return { tl, enterEnd };
}
