import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Param } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:username')
  getUser(@Param('username') username: string) {
    return this.userService.getUser(username);
  }
}
