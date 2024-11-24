import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

interface User {
  id?: number;
  name: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Post('users')
  createUser(@Body() user: User) {
    console.log(user);

    return this.appService.createUser(user);
  }

  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() user: User) {
    return this.appService.updateUser(id, user);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    console.log(id);

    return this.appService.deleteUser(id);
  }
}
