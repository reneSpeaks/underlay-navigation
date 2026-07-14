"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "@/domains/public/navigation/NavContext";
import { LINKS, SOCIALS, QUICK } from "@/domains/public/navigation/nav.config";
import { navMark } from "@/domains/public/navigation/nav.elements";
import { useAnchoredPointer } from "@/domains/public/navigation/useAnchoredPointer";

const LIST_CLASS = "text-5xl flex flex-col leading-15 gap-1";
const ITEM_CLASS = "px-1 rounded-xs";

export default function Nav() {
	const { isOpen, close } = useNav();
	const pathname = usePathname();
	const activeIndex = LINKS.findIndex(({ href }) =>
		href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`),
	);
	const { listRef, pointerRef, cloneRef, select, listHandlers, itemHandlers, linkHandlers } = useAnchoredPointer(activeIndex, isOpen);

	return (
		<>
			<nav
				{...navMark("menu")}
				id="primary-nav"
				aria-label="Primary"
				inert={!isOpen}
				tabIndex={-1}
				className="fixed top-0 right-0 z-10 px-10 pt-20 pb-5 size-menu h-dvh flex flex-col justify-between bg-foreground text-background focus:outline-none"
			>
				<div className="relative">
					<ul {...listHandlers} ref={listRef} className={LIST_CLASS}>
						{LINKS.map(({ href, label }, i) => (
							<li key={href} {...navMark("revealL")} className={ITEM_CLASS} {...itemHandlers(i)}>
								<Link
									href={href}
									onClick={() => {
										select(i);
										close();
									}}
									aria-current={i === activeIndex ? "page" : undefined}
									{...linkHandlers(i)}
								>
									{label}
								</Link>
							</li>
						))}
					</ul>

					<span
						ref={pointerRef}
						aria-hidden="true"
						className="pointer-events-none invisible absolute left-0 top-0 overflow-hidden rounded-xs bg-background"
					>
						<ul ref={cloneRef} className={`absolute left-0 top-0 ${LIST_CLASS} text-foreground`}>
							{LINKS.map(({ label }) => (
								<li key={label} className={ITEM_CLASS}>
									{label}
								</li>
							))}
						</ul>
					</span>
				</div>

				<div>
					<div {...navMark("menuBorder")} className="h-px w-full bg-background/20 origin-left" />
					<div className="grid grid-cols-2 text-sm pt-4">
						<div className="flex flex-col gap-1">
							<h4 {...navMark("revealS")} className="text-background/50 mb-1">
								Socials
							</h4>
							{SOCIALS.map(({ href, label }) => (
								<Link key={label} href={href} onClick={close} {...navMark("revealS")} className="text-sm">
									{label}
								</Link>
							))}
						</div>
						<div className="flex flex-col gap-1">
							<h4 {...navMark("revealS")} className="text-background/50 mb-1">
								Quick Links
							</h4>
							{QUICK.map(({ href, label }) => (
								<Link key={href} href={href} onClick={close} {...navMark("revealS")} className="text-sm">
									{label}
								</Link>
							))}
						</div>
					</div>
				</div>
			</nav>

			<div
				{...navMark("overlay")}
				onClick={close}
				aria-hidden="true"
				className={`fixed inset-0 z-30 overflow-clip invisible ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
			>
				<div {...navMark("dark")} className="absolute inset-0 bg-background/30" />
				<div className="absolute inset-0 flex flex-col justify-between">
					<div className="flex flex-col items-end">
						<div {...navMark("border")} className="w-full h-2 bg-foreground" />
						<div
							{...navMark("corner")}
							className="size-6 bg-foreground [-webkit-mask:radial-gradient(circle_at_0_100%,#0000_1.5rem,#000_1.5rem)] [mask:radial-gradient(circle_at_0_100%,#0000_1.5rem,#000_1.5rem)]"
						/>
					</div>
					<div className="flex flex-col items-end">
						<div
							{...navMark("corner")}
							className="size-6 bg-foreground [-webkit-mask:radial-gradient(circle_at_0_0,#0000_1.5rem,#000_1.5rem)] [mask:radial-gradient(circle_at_0_0,#0000_1.5rem,#000_1.5rem)]"
						/>
						<div {...navMark("border")} className="w-full h-2 bg-foreground" />
					</div>
				</div>
			</div>
		</>
	);
}
