import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('express')
export class UserController {
  constructor(private readonly UserService: UserService) {}


  @Get('/message')
  getMessage() {
    return this.UserService.getMessage('bilanox');
  }
}
