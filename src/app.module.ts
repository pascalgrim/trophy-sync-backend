import { Module } from '@nestjs/common';
import { TrophiesModule } from './trophies/trophies.module';
import { ConfigModule } from '@nestjs/config';
import { PsnAuthModule } from './psn-api-auth/psn-api-auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TrophiesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PsnAuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
