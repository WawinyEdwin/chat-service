

import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway, ChatService],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    chatService = module.get<ChatService>(ChatService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleConnection', () => {
    it('should emit list of connected users on new connection', () => {});
  });

  describe('handlePublicMessage', () => {
    it('should create chat and emit announcement', async () => {});
  });

  describe('handlePrivate', () => {
    it('should create chat and emit message to socket', async () => {});
  });

  describe('handleDisconnect', () => {
    it('should emit userDisconnected event', () => {});
  });
});
