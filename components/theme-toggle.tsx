"use client"

import { useEffect } from "react"
import { useApp } from "@/digital"
import { Sun, MoonStar } from "lucide-react"


export function ThemeToggle() {
	const app = useApp()

	useEffect(() => {
		try {
			document.documentElement.setAttribute("data-theme", app.theme)
		} catch (error) {
			console.log(error)
		}
	}, [app.theme])

	function toggleTheme() {
		if (app.theme === "light") {
			app.toggleTheme("dark")
		} else {
			app.toggleTheme("light")
		}
	}

	return (
		<label className="btn btn-square btn-ghost swap swap-rotate btn-sm">
			<input
				defaultChecked={app.theme === "light"}
				type="checkbox"
				onClick={toggleTheme}
				className="hidden"
			/>
			<>
				<Sun className="swap-on h-6 w-6" />
				<MoonStar className="swap-off h-6 w-6" />
			</>
		</label>
	)
}
