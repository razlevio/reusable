"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearch } from "@/hooks/use-search"
import { useUser } from "@clerk/nextjs"
import { munisIdsMap } from "@/lib/constants"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

/**
 * The SearchCommand component provides a user interface for searching municipalities.
 * It uses a command palette style interface for input and displays results dynamically.
 */
export function SearchCommand() {
	// State and hooks for user, routing, and search functionality.
	const { isSignedIn } = useUser()
	const router = useRouter()
	const [isMounted, setIsMounted] = useState(false)
	const toggle = useSearch((store) => store.toggle)
	const isOpen = useSearch((store) => store.isOpen)
	const onClose = useSearch((store) => store.onClose)

	// Effect to mark the component as mounted after initial render.
	useEffect(() => {
		setIsMounted(true)
	}, [])

	// Effect to listen for keyboard shortcuts to open/close the search command.
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				toggle()
			}
		}
		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [toggle])

	// Function to handle selecting a municipality from the search results.
	const onSelect = (id: number) => {
		router.push(`/control/munipage/${id}`)
		onClose();
	}

	// Render null if the component hasn't mounted yet (to avoid SSR hydration issues).
	if (!isMounted || !isSignedIn) return null

	return (
	  <CommandDialog open={isOpen} onOpenChange={onClose}>
	    <CommandInput placeholder="חפש רשות"/>
	    <CommandList>
	      <CommandEmpty>לא נמצאו רשויות</CommandEmpty>
	      <CommandGroup heading="רשויות">
	        {Object.entries(munisIdsMap)?.map(([name, id]) => (
	          <CommandItem
	            key={id}
	            value={`${id}-${name}`}
	            title={name}
	            onSelect={() => onSelect(id)}
	          >
	            <span>{name}</span>
	          </CommandItem>
	        ))}
	      </CommandGroup>
	    </CommandList>
	  </CommandDialog>
	)
}
