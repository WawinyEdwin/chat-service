import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

//   @Get()
//   async getChats(): Promise<Chat[]> {
//     return await this.chatService.getUserChats();
//   }
}
