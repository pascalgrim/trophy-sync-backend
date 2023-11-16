import { Module } from '@nestjs/common';
import { PsnApiAuthService } from './psn-api-auth.service';

@Module({
  providers: [PsnApiAuthService],
  exports: [PsnApiAuthService],
})
export class PsnAuthModule {}
