import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ChatClient } from 'src/socket-client/socket-client';

@Injectable()
export class WebsocketServerService {

    private connectedClients: Map<string, ChatClient> = new Map<string, ChatClient>;
    // { { key: "isadisadasd", object: chatClient} }

    registerClient( client: Socket ) {
      this.connectedClients.set(client.id, new ChatClient("Anónimo", client));
    }
  
    removeClient( clientId: string ) {
      this.connectedClients.delete(clientId);
    }
  
    getConnectedClient(id: string): ChatClient {
      if (this.connectedClients.has(id)) {
        return this.connectedClients.get(id);
      }
      return null;
    }

    getCountClients(): number {
      return this.getConnectedClients().length;
    }
  
    getConnectedClients(): string[] {
      return [...this.connectedClients.keys()];
    }
}
