"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNav } from "@/domains/public/navigation/NavContext";
import { one, buildNavTimeline } from "@/domains/public/navigation/nav.timeline";

export default function NavController() {
	const { isOpen, close } = useNav();
	const tlRef = useRef<gsap.core.Timeline | null>(null);
	const enterEndRef = useRef(0);
	const didMount = useRef(false);

	useGSAP(() => {
		const built = buildNavTimeline();
		if (!built) return;
		tlRef.current = built.tl;
		enterEndRef.current = built.enterEnd;
	}, {});

	useEffect(() => {
		const tl = tlRef.current;
		if (!tl) return;
		if (!didMount.current) {
			didMount.current = true;
			return;
		}
		if (isOpen) {
			tl.invalidate();
			if (tl.time() >= enterEndRef.current) tl.timeScale(1).restart();
			else tl.timeScale(1).play();
		} else if (tl.time() < enterEndRef.current) {
			tl.timeScale(1).reverse();
		} else {
			tl.timeScale(1).play();
		}
	}, [isOpen]);

	useEffect(() => {
		const menuEl = one("menu");
		const mainEl = one("main");
		if (!menuEl || !mainEl) return;
		if (isOpen) {
			mainEl.inert = true;
			menuEl.focus();
		} else {
			if (menuEl.contains(document.activeElement)) one("toggle")?.focus();
			mainEl.inert = false;
		}
	}, [isOpen]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				close();
				one("toggle")?.focus();
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [isOpen, close]);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		const onResize = () => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				const tl = tlRef.current;
				const menuEl = one("menu");
				if (!tl || !menuEl) return;
				if (isOpen) gsap.set([one("main"), one("overlay")], { x: -menuEl.offsetWidth });
				else tl.invalidate();
			}, 150);
		};
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [isOpen]);

	return null;
}
