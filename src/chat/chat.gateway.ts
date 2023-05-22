import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { Chat } from './chat.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private middlewares = [];

  constructor(private chatService: ChatService) {
  }

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WS Initialized');
  }

  async handleConnection(socket: Socket, ...args: any[]) {
    const users = [];
    for (let [id, socket] of this.server.of('/').sockets) {
      users.push({
        userId: id,
      });
    }
 
    socket.emit('users', users);

    socket.broadcast.emit('userConnected', {
      userId: socket.id
    });
  }

  @SubscribeMessage('publicMessage')
  async handlePublicMessage(socket: Socket, payload: Chat): Promise<void> {
    await this.chatService.createChat(payload);

    this.server.emit('announcement', payload);
  }

  @SubscribeMessage('privateMessage')
  async handlePrivate(socket: Socket, payload: any): Promise<void> {
    await this.chatService.createChat(payload);

    this.server.to(payload.to).emit('recMessage', {
      text: payload.text,
      from: socket.id,
    });
  }

  async handleDisconnect(client: Socket) {
    this.server.emit('userDisconnected', `${client.id} has  disconnected`);
  }
}
