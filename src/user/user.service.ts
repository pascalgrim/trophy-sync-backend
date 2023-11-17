import { Injectable } from '@nestjs/common';
import { PsnApiRepository } from 'src/repository/psn-api.repository';

@Injectable()
export class UserService {
  constructor(private psnApiRepository: PsnApiRepository) {}
  async getUser(username: string) {
    const res = this.psnApiRepository.getUserAccountID(username);
    return res;
  }
}
