import PartySocket from "partysocket";
import { PARTYKIT_URL } from "@/party/env";


/**
 * Initializes and exports a PartySocket instance.
 * PartySocket is used for real-time communication between clients in a specified room.
 */
export const socket = new PartySocket({
  host: PARTYKIT_URL,
  room: "main",
})
