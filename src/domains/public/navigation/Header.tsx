import Logo from "@/domains/public/navigation/Logo";
import Burger from "@/domains/public/navigation/Burger";

export default function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-50">
			<div className="flex items-center justify-between pt-5 px-10">
				<Logo />
				<Burger />
			</div>
		</header>
	);
}
