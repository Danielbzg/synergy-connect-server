import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WebsocketServerService } from './websocket-server.service';
import { Server, Socket } from 'socket.io';
import { CrudNotesService } from 'src/crud-notes/crud-notes.service';
import { CreateCrudNoteDto } from 'src/crud-notes/dto/create-crud-note.dto';
import {v4 as uuid} from 'uuid';
import { ChatClient } from 'src/socket-client/socket-client';
import * as nodemailer from 'nodemailer';

@WebSocketGateway({ cors: true })
export class WebsocketServerGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;
  private transporter: nodemailer.Transporter;
  
  constructor(
    private readonly websocketServerService: WebsocketServerService,
    private readonly crudNotesService: CrudNotesService,
    ) {
      this.transporter = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "api",
          pass: "711978a06f9cc71a97b2d7c914df84ac"
        }
      });
    }

  //Usuario se conecta
  async handleConnection(client: Socket) {
    this.websocketServerService.registerClient(client);
    console.log({ "Se ha conectado alguien. Actualmente hay":  this.websocketServerService.getCountClients() });

    this.wss.emit('clients-updated', this.websocketServerService.getConnectedClients());    
    this.crudNotesService.findAll().then(datos => {
      datos.forEach((note: CreateCrudNoteDto) => {
        client.emit('addNote', note); 
      })
    })
  }

  //Usuario se desconecta
  handleDisconnect(client: Socket) {
    this.websocketServerService.removeClient(client.id);
    console.log({ "Se ha desconectado alguien. Actualmente hay": this.websocketServerService.getCountClients() });

    this.wss.emit('clients-updated', this.websocketServerService.getConnectedClients());
    
    this.enviarCorreo();
  }

  // Función para enviar el correo electrónico
  private async enviarCorreo() {
    const mailOptions = {
      from: 'mailtrap@demomailtrap.com',
      to: 'danielbg72@gmail.com',
      subject: 'Alerta: Desconexión del WebSocket',
      text: 'Se ha detectado una desconexión del WebSocket.'
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
    } catch (error) {
      console.log('Error al enviar el correo electrónico:', error);
    }
  }

  // logica notas
  @SubscribeMessage('createNote')
  create(@MessageBody() createNoteDto: CreateCrudNoteDto) {
    const idCreated = uuid();
    this.wss.emit('addNote', {id: idCreated, title: createNoteDto.title, description: createNoteDto.description});
    const created = this.crudNotesService.create(idCreated, createNoteDto);
    return created;
  }

  @SubscribeMessage('updateNote')
  update(@MessageBody() updateNoteDto: CreateCrudNoteDto) {
    console.log(updateNoteDto)
    this.crudNotesService.update(updateNoteDto)
    this.wss.emit('updatedNote', updateNoteDto)
    return;
  }

  @SubscribeMessage('removeNote')
  remove(@MessageBody() id: string) {
    this.crudNotesService.remove(id)
    this.wss.emit('removedNote', id);
    return;
  }

  // Logica foro
  @SubscribeMessage('defineName')
  defineName(@MessageBody() name: string, @ConnectedSocket() conn: Socket) {
    this.websocketServerService.getConnectedClient(conn.id).name = name;
    console.log("Nombre de la conexón " + conn.id + " cambiado a " + name)
    return;
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() message: string, @ConnectedSocket() conn: Socket) {
    const chatClient: ChatClient = this.websocketServerService.getConnectedClient(conn.id);
    console.log("enviando mensaje a " + conn.id + " - " + message)
    this.wss.emit('receiveMessage', { name: chatClient.name, message: message });
    return;
  }
}