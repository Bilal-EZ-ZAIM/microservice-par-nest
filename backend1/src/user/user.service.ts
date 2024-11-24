import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

interface User {
  id: number;
  name: string;
}

@Injectable()
export class UserService {
  constructor(
    @Inject('EXPRESS_MICROSERVICE')
    private readonly ExpressService: ClientProxy,
  ) {}

  user: User[] = [
    {
      id: 1,
      name: 'user1',
    },
    {
      id: 2,
      name: 'user2',
    },
    {
      id: 3,
      name: 'user3',
    },
  ];
  getAllProducst(): User[] {
    return this.user;
  }

  async getMessage(name: string): Promise<any> {
    const pattern = { cmd: 'get-message' };
    const payload = { name };

    return this.ExpressService.send(pattern, payload).toPromise();
  }
}
