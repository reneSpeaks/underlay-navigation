"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type NavContextValue = {
	isOpen: boolean;
	close: () => void;
	toggle: () => void;
};

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen((v) => !v), []);

	const value = useMemo(() => ({ isOpen, close, toggle }), [isOpen, close, toggle]);

	return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
	const context = useContext(NavContext);
	if (!context) throw new Error("useNav must be used within a <NavProvider>");
	return context;
}
