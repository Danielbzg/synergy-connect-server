import { Socket } from 'socket.io';

export class ChatClient {
    name: string;
    conn: Socket;

    constructor(name: string, conn: Socket) {
        this.name = name;
        this.conn = conn;
    }
    getID(): string {
        return this.conn.id;
    }
}