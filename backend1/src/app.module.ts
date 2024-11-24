import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EXPRESS_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: 3005,
        },
      },
      {
        name: 'USERS_SERVICES',
        transport: Transport.TCP,
        options: {
          port: 3003,
        },
      },
    ]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
