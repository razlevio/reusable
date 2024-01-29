"use client"

import Link from "next/link"
import { ElementRef, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { useSearch } from "@/hooks/use-search"
import { UserButton, useUser } from "@clerk/nextjs"
import {
	Bolt,
	Contact,
	FileText,
	GaugeCircle,
	GitCompare,
	Menu,
	Search,
} from "lucide-react"
import { useMediaQuery } from "usehooks-ts"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export function AppShell({ children }: { children: React.ReactNode }) {
	const { isSignedIn, isLoaded } = useUser()
	const pathname = usePathname()
	const isMobile = useMediaQuery("(max-width: 768px)")
	const search = useSearch()
	const sidebarRef = useRef<ElementRef<"aside">>(null)
	const navbarRef = useRef<ElementRef<"nav">>(null)
	const [isSidebarVisible, setIsSidebarVisible] = useState(!isMobile)

	const toggleSidebar = () => {
		setIsSidebarVisible(!isSidebarVisible)
	}

	const closeSidebar = () => {
		if (isMobile) {
			setIsSidebarVisible(false)
		}
	}

	useEffect(() => {
		if (isMobile) {
			setIsSidebarVisible(false)
		} else {
			setIsSidebarVisible(true)
		}
	}, [isMobile])

	return (
		<div className="antialiased">
			{/* Navbar */}
			<nav
				ref={navbarRef}
				className={
					"fixed inset-x-0 top-0 z-50 border-b border-base-300 bg-base-100 px-4 py-2.5"
				}
			>
				<div className="flex flex-wrap items-center justify-between">
					{/* LOGO - MOBILE BURGER - SEARCH*/}
					<div className="flex items-center justify-start">
						{/* MOBILE BURGER */}
						{isMobile && (
							<button
								onClick={toggleSidebar}
								className="btn btn-square btn-ghost btn-sm mr-2 md:hidden"
							>
								<Menu className="h-6 w-6" />
								<span className="sr-only">פתח את סרגל הצד</span>
							</button>
						)}

						{/* LOGO */}
						<Link href="/" className="mr-4 flex items-center justify-between">
							<Logo src="/logos/logo-symbol-hd.png" className="mr-2 h-9 w-9" />
							<span className="self-center whitespace-nowrap text-lg font-bold dark:text-white">
								מבחן תמיכה
							</span>
							<span className="sr-only">לוגו</span>
						</Link>

						{/* Search */}
						{isSignedIn && (
							<div
								onClick={search.onOpen}
								className="justify group ml-6 hidden h-8 w-64 items-center rounded-lg bg-base-200 p-2 font-medium hover:cursor-pointer md:flex"
							>
								<Search className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-base-content" />
								<div className="flex w-full items-center justify-between">
									<span className="ml-3 text-gray-500 transition duration-75 group-hover:text-base-content">
										חיפוש
									</span>
									<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-base-300 px-1.5 font-mono text-[10px] font-medium text-gray-500 transition duration-75 group-hover:text-base-content">
										<span className="text-xs">⌘</span>K
									</kbd>
								</div>
							</div>
						)}
					</div>

					{/* ICONS */}
					<div className="flex gap-1">
						{/* Search  */}
						{isSignedIn && (
							<button
								onClick={search.onOpen}
								type="button"
								className="btn btn-square btn-ghost btn-sm md:hidden"
							>
								<span className="sr-only">Toggle search</span>
								<Search className="h-6 w-6" />
							</button>
						)}

						{/* ThemeToggle */}
						<ThemeToggle />

						{/* User Controls */}
						{isLoaded ? (
							<UserButton afterSignOutUrl="/" />
						) : (
							<div className="btn btn-circle btn-ghost btn-sm">
								<div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
							</div>
						)}
					</div>
				</div>
			</nav>

			{/* Sidebar */}
			<aside
				ref={sidebarRef}
				className={cn(
					"fixed right-0 top-0 z-40 h-screen w-[12.2rem] border-l border-base-300 bg-base-100 pt-14",
					isSidebarVisible ? "translate-x-0" : "translate-x-full",
					"transition-transform duration-300",
					isSignedIn ? "md:block" : "hidden"
				)}
				aria-label="Sidebar"
			>
				<div className="h-full overflow-y-auto px-3 py-5">
					{/* Upper sidebar */}
					<ul className="space-y-2 ">
						{/* Dashboard */}
						<li>
							<Link
								href="/dashboard"
								onClick={closeSidebar}
								className={cn(
									"group flex items-center rounded-lg p-2 font-medium",
									pathname.startsWith("/dashboard")
										? "bg-base-200"
										: "hover:bg-base-200"
								)}
							>
								<GaugeCircle
									className={cn(
										"h-6 w-6 text-gray-500 transition duration-75",
										pathname.startsWith("/dashboard")
											? "text-base-content"
											: "group-hover:text-base-content"
									)}
								/>
								<span
									className={cn(
										"ml-3 text-base-content",
										pathname.startsWith("/dashboard") && "font-bold"
									)}
								>
									דשבורד
								</span>
							</Link>
						</li>
						{/* Control */}
						<li>
							<Link
								href="/control"
								onClick={closeSidebar}
								className={cn(
									"group flex items-center rounded-lg p-2 font-medium",
									pathname.startsWith("/control")
										? "bg-base-200"
										: "hover:bg-base-200"
								)}
							>
								<GitCompare
									className={cn(
										"h-6 w-6 text-gray-500 transition duration-75 group-hover:text-base-content",
										pathname.startsWith("/control")
											? "text-base-content"
											: "group-hover:text-base-content"
									)}
								/>
								<span
									className={cn(
										"ml-3 text-base-content",
										pathname.startsWith("/control") && "font-bold"
									)}
								>
									שליטה
								</span>
							</Link>
						</li>
						{/* Tasks */}
						<li>
							<Link
								href="/tasks"
								onClick={closeSidebar}
								className={cn(
									"group flex items-center rounded-lg p-2 font-medium",
									pathname.startsWith("/tasks")
										? "bg-base-200"
										: "hover:bg-base-200"
								)}
							>
								<Bolt
									className={cn(
										"h-6 w-6 text-gray-500 transition duration-75 group-hover:text-base-content",
										pathname.startsWith("/tasks")
											? "text-base-content"
											: "group-hover:text-base-content"
									)}
								/>
								<span
									className={cn(
										"ml-3 text-base-content",
										pathname.startsWith("/tasks") && "font-bold"
									)}
								>
									משימות
								</span>
							</Link>
						</li>
					</ul>

					{/* Lower sidebar */}
					<ul className="mt-5 space-y-2 border-t border-base-300 pt-5">
						<li>
							<Link
								href="/knowledge"
								onClick={closeSidebar}
								className={cn(
									"group flex items-center rounded-lg p-2 font-medium",
									pathname.startsWith("/knowledge")
										? "bg-base-200"
										: "hover:bg-base-200"
								)}
							>
								<FileText
									className={cn(
										"h-6 w-6 text-gray-500 transition duration-75 group-hover:text-base-content",
										pathname.startsWith("/knowledge")
											? "text-base-content"
											: "group-hover:text-base-content"
									)}
								/>
								<span
									className={cn(
										"ml-3 text-base-content",
										pathname.startsWith("/knowledge") && "font-bold"
									)}
								>
									מדריכים
								</span>
							</Link>
						</li>
						<li>
							<Link
								href="contacts"
								onClick={closeSidebar}
								className={cn(
									"group flex items-center rounded-lg p-2 font-medium",
									pathname.startsWith("/contacts")
										? "bg-base-200"
										: "hover:bg-base-200"
								)}
							>
								<Contact
									className={cn(
										"h-6 w-6 text-gray-500 transition duration-75 group-hover:text-base-content",
										pathname.startsWith("/contacts")
											? "text-base-content"
											: "group-hover:text-base-content"
									)}
								/>
								<span
									className={cn(
										"ml-3 text-base-content",
										pathname.startsWith("/contacts") && "font-bold"
									)}
								>
									אנשי קשר
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</aside>

			{/* Main Area */}
			{/* <main className="mt-14 bg-base-200 md:mr-[12.2rem]"> */}
			<main className="h-auto p-6 pt-20 md:mr-[12.2rem]">
				{children}
				{/* <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-4">
					<div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64 " />
					<div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />
					<div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />
					<div className="h-32 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-64" />
				</div>
				<div className="mb-4 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 h-96" />
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
					<div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
					<div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
					<div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
				</div>
				<div className="mb-4 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 h-96" />
				<div className="grid grid-cols-2 gap-4">
					<div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
					<div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
					<div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
					<div className="h-48 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 md:h-72" />
				</div> */}
			</main>
		</div>
	)
}
