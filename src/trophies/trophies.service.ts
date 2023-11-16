import { Injectable } from '@nestjs/common';
import { PsnApiRepository } from 'src/repository/psn-api.repository';

@Injectable()
export class TrophiesService {
  constructor(private readonly psnApiRepository: PsnApiRepository) {}
  // all trophies of user
  async getTrophyGamesOfUser(username: string) {
    const titles = await this.psnApiRepository.getUserTitles(username);
    return titles;
  }

  async getTitleTrophies(username: string, npCommunicationId: string) {
    const trophies = await this.psnApiRepository.getTrophiesOfTitle(
      username,
      npCommunicationId,
    );
    return trophies;
  }
}
