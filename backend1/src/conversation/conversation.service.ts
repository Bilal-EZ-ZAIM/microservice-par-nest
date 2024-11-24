import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  private conversations = []; // Array to store conversations

  // Create a new conversation
  create(createConversationDto: CreateConversationDto) {
    const newConversation = {
      id: this.conversations.length + 1, // Auto-increment ID
      title: createConversationDto.title, // Example field from DTO
      participants: createConversationDto.participants || [], // Default to empty array
      createdAt: new Date(), // Timestamp of creation
      updatedAt: new Date(), // Timestamp of last update
    };
    this.conversations.push(newConversation);
    return newConversation; // Return the created conversation
  }

  // Get all conversations
  findAll() {
    return this.conversations; // Return all stored conversations
  }

  // Get a specific conversation by ID
  findOne(id: number) {
    const conversation = this.conversations.find((c) => c.id === id);
    if (!conversation) {
      return `Conversation with ID ${id} not found`;
    }
    return conversation;
  }

  // Update a conversation by ID
  update(id: number, updateConversationDto: UpdateConversationDto) {
    const conversationIndex = this.conversations.findIndex((c) => c.id === id);
    if (conversationIndex === -1) {
      return `Conversation with ID ${id} not found`;
    }

    const updatedConversation = {
      ...this.conversations[conversationIndex],
      ...updateConversationDto,
      updatedAt: new Date(), // Update timestamp
    };

    this.conversations[conversationIndex] = updatedConversation;
    return updatedConversation;
  }

  // Remove a conversation by ID
  remove(id: number) {
    const conversationIndex = this.conversations.findIndex((c) => c.id === id);
    if (conversationIndex === -1) {
      return `Conversation with ID ${id} not found`;
    }

    const removedConversation = this.conversations.splice(conversationIndex, 1);
    return removedConversation[0]; // Return the removed conversation
  }
}
