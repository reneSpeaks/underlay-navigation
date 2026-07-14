import type { Metadata } from "next";
import PublicLayout from "@/domains/public/layout/PublicLayout";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "Underlay Navigation Playground",
	description: "A playground for experimenting with underlay navigation using Next.js and Tailwind CSS.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full antialiased">
			<body className="overflow-x-hidden">
				<PublicLayout>{children}</PublicLayout>
			</body>
		</html>
	);
}
