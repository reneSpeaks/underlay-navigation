import { useCallback, useEffect, useRef, type FocusEvent } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/shared/utils/prefers-reduced-motion";

export function useAnchoredPointer(activeIndex: number, isOpen: boolean) {
	const listRef = useRef<HTMLUListElement>(null);
	const pointerRef = useRef<HTMLSpanElement>(null);
	const cloneRef = useRef<HTMLUListElement>(null);

	const move = useCallback((index: number, animate: boolean) => {
		const list = listRef.current;
		const pointer = pointerRef.current;
		const clone = cloneRef.current;
		if (!list || !pointer || !clone) return;
		const animated = animate && !prefersReducedMotion();
		const li = list.children[index] as HTMLElement | undefined;
		if (!li) {
			gsap.to(pointer, { autoAlpha: 0, duration: animated ? 0.2 : 0 });
			return;
		}
		const x = li.offsetLeft;
		const y = li.offsetTop;
		const duration = animated ? 0.4 : 0;
		const ease = "power2.inOut";
		gsap.to(pointer, { x, y, width: li.offsetWidth, height: li.offsetHeight, autoAlpha: 1, duration, ease });
		gsap.to(clone, { x: -x, y: -y, duration, ease });
	}, []);

	useEffect(() => {
		if (isOpen) move(activeIndex, false);
	}, [activeIndex, isOpen, move]);

	return {
		listRef,
		pointerRef,
		cloneRef,
		select: (index: number) => move(index, true),
		listHandlers: {
			onMouseLeave: () => move(activeIndex, true),
			onBlur: (e: FocusEvent<HTMLUListElement>) => {
				if (!e.currentTarget.contains(e.relatedTarget as Node)) move(activeIndex, true);
			},
		},
		itemHandlers: (index: number) => ({ onMouseEnter: () => move(index, true) }),
		linkHandlers: (index: number) => ({ onFocus: () => move(index, true) }),
	};
}
