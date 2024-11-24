import { Controller, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

interface User {
  id: number;
  name: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'GET_ALL_USERS' })
  getAllUser(): User[] | NotFoundException {
    return this.appService.getAllUsers();
  }

  @MessagePattern({ cmd: 'GET_USER_BY_ID' })
  getUserById(@Payload() id: number): User | NotFoundException {
    return this.appService.getUserById(id);
  }

  @EventPattern({ cmd: 'CREATE_USER' })
  createUser(@Payload() name: any): User {
    return this.appService.createUser(name.name);
  }

  @EventPattern({ cmd: 'UPDATE_USER' })
  updateUser(
    @Payload() data: { id: number; name: string },
  ): User | NotFoundException {
    console.log(data);

    return this.appService.updateUser(data);
  }

  @MessagePattern({ cmd: 'DELETE_USER' })
  deleteUser(@Payload() id: string) {
    console.log(id);
    
    return this.appService.deleteUser(id);
  }
}
