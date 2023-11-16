import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  exchangeNpssoForCode,
  exchangeCodeForAccessToken,
  AuthTokensResponse,
} from 'psn-api';

@Injectable()
export class PsnApiAuthService {
  private authorization: AuthTokensResponse;
  constructor(private configService: ConfigService) {}

  async getAuthorizedClient() {
    if (!this.authorization) {
      this.authorization = await this.authorizeNpsso();
    }

    return this.authorization;
  }
  private async authorizeNpsso() {
    try {
      const npsso = this.configService.get<string>('NPSSO');
      const accessCode = await exchangeNpssoForCode(npsso);
      const authorization = await exchangeCodeForAccessToken(accessCode);
      return authorization;
    } catch (error) {
      throw new Error(`Unable to authorize with psn-api: ${error.message}`);
    }
  }
}
