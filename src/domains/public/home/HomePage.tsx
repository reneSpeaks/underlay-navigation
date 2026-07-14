import Image from "next/image";

export default function HomePage() {
	return (
		<section className="h-dvh w-full">
			<Image
				src="/coffee-newspaper-sryedeforoogh.jpg"
				alt="A cup of coffee sitting on a table with a daily newspaper"
				width={1920}
				height={1280}
				className="h-full w-full object-cover object-left"
			/>
		</section>
	);
}
