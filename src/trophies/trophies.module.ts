import { Module } from '@nestjs/common';
import { TrophiesService } from './trophies.service';
import { TrophiesController } from './trophies.controller';
import { PsnApiRepository } from 'src/repository/psn-api.repository';
import { PsnApiAuthService } from 'src/psn-api-auth/psn-api-auth.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [TrophiesController],
  providers: [
    TrophiesService,
    PsnApiRepository,
    PsnApiAuthService,
    ConfigService,
  ],
  imports: [],
})
export class TrophiesModule {}
