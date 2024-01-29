import "@/styles/globals.css"
import { appConfig } from "@/config/app"
import { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { geist } from "@/lib/fonts"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
	title: {
		default: appConfig.name,
		template: `${appConfig.name} | %s`,
	},
	applicationName: appConfig.name,
	description: appConfig.description,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	authors: [
		{
			name: "razlevio",
			url: "https://github.com/razlevio",
		},
	],
	creator: "razlevio",
	icons: {
		icon: "/favicon.png",
		shortcut: "/favicon.png",
	},
	verification: {
		google: "google",
		yandex: "yandex",
	},
}


/**
 * Root layout component for the application.
 * Wraps the entire application providing common structure and styling.
*/
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html className={`${geist.variable} ${geist.className} h-full`}>
				<body>
					<Navbar />
					{children}
					<Analytics />
			         <SpeedInsights />
				</body>
			</html>
		</ClerkProvider>
	)
}
