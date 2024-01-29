"use client"

import { revalidateAction } from "@/app/_actions/main-actions"
import { PARTYKIT_URL } from "@/party/env"
import usePartySocket from "partysocket/react"

/**
 * A component that sets up a real-time connection to listen for specific messages.
 * When a 'refresh' message is received, it triggers a revalidation action.
 * This component is meant to be used on the client side only.
 */
export function RealtimeProvider() {
	usePartySocket({
		host: PARTYKIT_URL,
		room: "main",
		onMessage(e) {
			if (e.data === "refresh") {
				revalidateAction()
			}
		},
		onError(e) {
			console.error("Websocket error: ", e)
		},
	})
	return <></>
}
