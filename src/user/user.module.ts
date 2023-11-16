import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PsnApiRepository } from 'src/repository/psn-api.repository';
import { PsnApiAuthService } from 'src/psn-api-auth/psn-api-auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PsnApiRepository, PsnApiAuthService],
})
export class UserModule {}
