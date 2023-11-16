import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrophiesService } from './trophies.service';

@Controller('trophies')
export class TrophiesController {
  constructor(private readonly trophiesService: TrophiesService) {}

  @Get('/user/:username')
  getTrophyGamesOfUser(@Param('username') username: string) {
    return this.trophiesService.getTrophyGamesOfUser(username);
  }

  @Get('/user/:username/:npCommunicationId/')
  getTrophiesOfTitle(
    @Param('username') username: string,
    @Param('npCommunicationId') npCommunicationId: string,
  ) {
    return this.trophiesService.getTitleTrophies(username, npCommunicationId);
  }
}
