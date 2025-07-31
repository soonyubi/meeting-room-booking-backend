import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BookingsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(`room-${roomId}`);
    console.log(`Client ${client.id} joined room: ${roomId}`);
    return { event: 'joined-room', roomId };
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(`room-${roomId}`);
    console.log(`Client ${client.id} left room: ${roomId}`);
    return { event: 'left-room', roomId };
  }
}
