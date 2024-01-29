import type * as Party from "partykit/server"

export default class Server implements Party.Server {
	constructor(readonly party: Party.Party) {}
  onMessage(message: string, sender: Party.Connection) {
    if (message === "refresh") {
      this.party.broadcast("refresh");  // Broadcasting to all clients
    }
  }
}

Server satisfies Party.Worker
