"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/shared/utils/prefers-reduced-motion";

const RIGHT_LEN = 463;
const LEFT_LEN = 280;

export default function Logo() {
	const pathname = usePathname();
	const rightRef = useRef<SVGPathElement>(null);
	const leftRef = useRef<SVGPathElement>(null);
	const didMount = useRef(false);

	useGSAP(
		() => {
			const right = rightRef.current;
			const left = leftRef.current;
			const DRAW = { duration: 0.6, ease: "power1.inOut" } as const;

			if (prefersReducedMotion()) {
				gsap.set([right, left], { strokeDashoffset: 0 });
				didMount.current = true;
				return;
			}

			if (!didMount.current) {
				didMount.current = true;
				gsap.fromTo(right, { strokeDashoffset: RIGHT_LEN }, { strokeDashoffset: 0, ...DRAW, delay: 0.4 });
				gsap.fromTo(left, { strokeDashoffset: LEFT_LEN }, { strokeDashoffset: 0, ...DRAW, delay: 0.7 });
				return;
			}

			gsap.timeline()
				.fromTo(right, { strokeDashoffset: 0 }, { strokeDashoffset: RIGHT_LEN, ...DRAW }, 0)
				.fromTo(left, { strokeDashoffset: 0 }, { strokeDashoffset: LEFT_LEN, ...DRAW }, 0)
				.to(right, { strokeDashoffset: 0, ...DRAW }, ">")
				.to(left, { strokeDashoffset: 0, ...DRAW }, "<+=0.3");
		},
		{ dependencies: [pathname] },
	);

	return (
		<Link href="/" aria-label="Home" className="block size-nav">
			<svg viewBox="0 0 256 256" aria-hidden="true" className="size-full">
				<defs>
					<clipPath id="logo-r-clip">
						<path
							d="M251.44,235.04h-40l-.5-.4-102.5-89.7,1.8-1.6,34.8-31,12.2-10.4c3.9-3.2,7.4-6.2,7.8-6.8,4.8-5.8,7.3-12.8,7.3-20.4,0-17.6-14.3-31.9-31.9-31.9H30.86L5.14,16.24l140.4-.1-.2.2c29.9,2.5,53.6,27.9,53.6,58.3,0,13.4-4.8,26.7-13.5,37.2-.5.6-2.3,2.3-2.6,2.6s-1.1,1-1.1,1l-.5.4-32.9,28.8,103.1,90.4Z"
							fill="none"
						/>
					</clipPath>
					<clipPath id="logo-r-clip-1">
						<polygon points="54.9 147.2 134.9 77.2 101.4 77.2 21.4 147.2 122 235.3 155.5 235.3 54.9 147.2" fill="none" />
					</clipPath>
					<linearGradient
						id="logo-r-grad"
						x1="-156.53"
						y1="-98.24"
						x2="115.46"
						y2="-98.24"
						gradientTransform="translate(156 235)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" stopColor="#0d324d" />
						<stop offset="1" stopColor="#1c7496" />
					</linearGradient>
					<linearGradient
						id="logo-r-grad-1"
						x1="-169.6"
						y1="-77.19"
						x2="21.81"
						y2="-77.19"
						gradientTransform="translate(156 235)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" stopColor="#0d324d" />
						<stop offset="1" stopColor="#1c7496" />
					</linearGradient>
				</defs>
				<g clipPath="url(#logo-r-clip)">
					<path
						ref={rightRef}
						d="M-.5,29.8l126.8-.1c29.9,2.5,57.4,17,57.4,47.4,0,13.4-4.3,24.4-17.4,37.2-.5.6-2.3,2.3-2.6,2.6-.3.3-1.1,1-1.1,1l-.5.4-32.9,28.8,118.9,105.6"
						fill="none"
						stroke="url(#logo-r-grad)"
						strokeDasharray="461 463"
						strokeDashoffset={RIGHT_LEN}
						strokeMiterlimit="10"
						strokeWidth="70.34"
					/>
				</g>
				<g clipPath="url(#logo-r-clip-1)">
					<path
						ref={leftRef}
						d="M154.6,249.8l-116.8-102.6c8.3-8.3,91.4-81.4,91.4-81.4"
						fill="none"
						stroke="url(#logo-r-grad-1)"
						strokeDasharray="278 280"
						strokeDashoffset={LEFT_LEN}
						strokeMiterlimit="10"
						strokeWidth="70.34"
					/>
				</g>
			</svg>
		</Link>
	);
}
