import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

interface User {
  id: number;
  name: string;
}

@Injectable()
export class AppService {
  private users: User[] = [
    {
      id: 1,
      name: 'bilal',
    },
  ];

  getAllUsers(): User[] | NotFoundException {
    return this.users.length > 0
      ? this.users
      : new NotFoundException('Users Not Found');
  }

  getUserById(id: number): User | NotFoundException {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  createUser(name: string): User {
    console.log(name);

    const newUser: User = {
      id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
      name,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(data: any): User {
    console.log(data);

    const user: User = this.users.find((item) => item.id === +data.id);

    if (!user) {
      throw new NotFoundException(`User with ID ${data.id} not found`);
    }

    user.name = data.name;

    return user;
  }

  deleteUser(id: string): { message: string } | NotFoundException {
    console.log(id);
    
    const userIndex = this.users.findIndex((user) => user.id === +id);
    console.log(userIndex);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
    return { message: `User with ID ${id} has been deleted successfully` };
  }
}
