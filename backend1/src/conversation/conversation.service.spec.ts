import { Test, TestingModule } from '@nestjs/testing';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

describe('ConversationService', () => {
  let service: ConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationService],
    }).compile();

    service = module.get<ConversationService>(ConversationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

 

  describe('findAll', () => {
    it('should return all conversations', () => {
      const conversations = service.findAll();
      expect(conversations).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a conversation by ID', () => {
      const createConversationDto: CreateConversationDto = {
        title: 'Conversation 1',
        participants: [],
        createdBy: 'User1', 
      };
      const conversation = service.create(createConversationDto);

      const found = service.findOne(conversation.id);
      expect(found).toEqual(conversation);
    });

    it('should return not found for non-existent ID', () => {
      const result = service.findOne(999);
      expect(result).toBe('Conversation with ID 999 not found');
    });
  });

 
  describe('remove', () => {
    it('should remove a conversation by ID', () => {
      const createConversationDto: CreateConversationDto = {
        title: 'Conversation to Remove',
        participants: [],
        createdBy: 'User1', 
      };
      const conversation = service.create(createConversationDto);

      const removed = service.remove(conversation.id);
      expect(removed).toEqual(conversation);
      expect(service.findOne(conversation.id)).toBe(
        'Conversation with ID 1 not found',
      );
    });

    it('should return not found for non-existent ID', () => {
      const result = service.remove(999);
      expect(result).toBe('Conversation with ID 999 not found');
    });
  });
});
