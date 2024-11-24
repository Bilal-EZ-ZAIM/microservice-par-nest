import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserCreatedEvent } from './UserCreatedEvent';

interface User {
  id?: number;
  name: string;
}

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS_SERVICES') private readonly UserService: ClientProxy,
  ) {}
  private users: User[] = [
    {
      id: 1,
      name: 'bilal',
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getAllUsers() {
    return this.UserService.send({ cmd: 'GET_ALL_USERS' }, {});
  }

  getUserById() {
    return this.UserService.send({ cmd: 'GET_USER_BY_ID' }, {});
  }

  createUser(user: User) {
    return this.UserService.send(
      { cmd: 'CREATE_USER' },
      new UserCreatedEvent(null, user.name),
    );
  }

  updateUser(id: string, user: User) {
    console.log(id, user.name);

    return this.UserService.send(
      { cmd: 'UPDATE_USER' },
      new UserCreatedEvent(id, user.name),
    );
  }

  deleteUser(id: string) {
    return this.UserService.send({ cmd: 'DELETE_USER' },  id );
  }
}
