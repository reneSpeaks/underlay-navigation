import Header from "@/domains/public/navigation/Header";
import Nav from "@/domains/public/navigation/Nav";
import NavController from "@/domains/public/navigation/NavAnimationController";
import { NavProvider } from "@/domains/public/navigation/NavContext";
import { navMark } from "@/domains/public/navigation/nav.elements";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<NavProvider>
			<Header />
			<Nav />
			<main {...navMark("main")} className="relative z-20 min-h-dvh bg-background">
				{children}
			</main>
			<NavController />
		</NavProvider>
	);
}
