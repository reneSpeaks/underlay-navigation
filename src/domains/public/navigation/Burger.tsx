"use client";

import { useNav } from "@/domains/public/navigation/NavContext";
import { navMark } from "@/domains/public/navigation/nav.elements";

export default function Burger() {
	const { isOpen, toggle } = useNav();

	return (
		<button
			{...navMark("toggle")}
			type="button"
			className="flex items-center gap-1 cursor-pointer bg-transparent text-foreground"
			aria-label={isOpen ? "Close menu" : "Open menu"}
			aria-expanded={isOpen}
			aria-controls="primary-nav"
			onClick={toggle}
		>
			<span aria-hidden="true" className="inline-flex h-lh flex-col overflow-hidden text-xl leading-none">
				<span {...navMark("label")} className="block">
					Menu
				</span>
				<span {...navMark("label")} className="block">
					Close
				</span>
			</span>

			<svg viewBox="0 0 100 100" aria-hidden="true" className="size-nav fill-none stroke-current stroke-6">
				<path
					{...navMark("burgerOuter")}
					className="[stroke-dasharray:60_207]"
					d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
				/>
				<path {...navMark("burgerMiddle")} className="[stroke-dasharray:60_60]" d="M 20,50 H 80" />
				<path
					{...navMark("burgerOuter")}
					className="[stroke-dasharray:60_207]"
					d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
				/>
			</svg>
		</button>
	);
}
