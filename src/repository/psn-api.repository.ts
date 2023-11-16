import { Injectable } from '@nestjs/common';
import { platform } from 'os';
import { AuthTokensResponse, makeUniversalSearch } from 'psn-api';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  getUserTitles,
  getProfileFromUserName,
  getUserTrophiesEarnedForTitle,
  getTitleTrophies,
  Trophy,
  TrophyTitle,
  TrophyRarity,
  getUserTrophyGroupEarningsForTitle,
} from 'psn-api';
import { PsnApiAuthService } from 'src/psn-api-auth/psn-api-auth.service';

@Injectable()
export class PsnApiRepository {
  private psnApiAuthorization: AuthTokensResponse;
  constructor(private readonly psnApiAuthService: PsnApiAuthService) {
    this.initializeAuthorizedClient();
  }
  private async initializeAuthorizedClient() {
    this.psnApiAuthorization =
      await this.psnApiAuthService.getAuthorizedClient();
  }

  async getTrophiesOfTitle(username: string, npCommunicationId: string) {
    try {
      const accountID = await this.getUserAccountID(username);
      const trophyTitlesResponse = await getUserTitles(
        { accessToken: this.psnApiAuthorization.accessToken },
        accountID,
      );
      const trophyList = this.getFullTrophyList(
        trophyTitlesResponse.trophyTitles,
        accountID,
        npCommunicationId,
      );
      return trophyList;
    } catch (error) {
      throw new Error(
        `Unable to fetch Trophies from title ${npCommunicationId}: ${error.message}`,
      );
    }
  }

  async getUserTitles(username: string) {
    try {
      const accountID = await this.getUserAccountID(username);
      const trophyTitlesResponse = await getUserTitles(
        { accessToken: this.psnApiAuthorization.accessToken },
        accountID,
      );
      return trophyTitlesResponse.trophyTitles;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to get User Titles',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async getUserAccountID(username: string) {
    try {
      const response = await getProfileFromUserName(
        this.psnApiAuthorization,
        username,
      );
      return response.profile.accountId;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async getFullTrophyList(
    trophyTitles: TrophyTitle[],
    accountID: string,
    npCommunicationId: string,
  ) {
    var game;
    let counter = 0;
    for (const title of trophyTitles) {
      if (title.npCommunicationId !== npCommunicationId) continue;
      counter++;
      // 4. Get the list of trophies for each of the user's titles.
      const { trophies: titleTrophies } = await getTitleTrophies(
        this.psnApiAuthorization,
        title.npCommunicationId,
        'all',
        {
          npServiceName:
            title.trophyTitlePlatform !== 'PS5' ? 'trophy' : undefined,
        },
      );
      const { trophies: earnedTrophies } = await getUserTrophiesEarnedForTitle(
        this.psnApiAuthorization,
        accountID,
        title.npCommunicationId,
        'all',
        {
          npServiceName:
            title.trophyTitlePlatform !== 'PS5' ? 'trophy' : undefined,
        },
      );
      const mergedTrophies = this.mergeTrophyLists(
        titleTrophies,
        earnedTrophies,
      );
      game = {
        gameName: title.trophyTitleName,
        platform: title.trophyTitlePlatform,
        trophyTypeCounts: title.definedTrophies,
        earnedCounts: title.earnedTrophies,
        trophyList: mergedTrophies,
      };
      break;
    }
    return game;
  }

  private mergeTrophyLists(titleTrophies: Trophy[], earnedTrophies: Trophy[]) {
    const mergedTrophies: any[] = [];

    for (const earnedTrophy of earnedTrophies) {
      const foundTitleTrophy = titleTrophies.find(
        (t) => t.trophyId === earnedTrophy.trophyId,
      );

      mergedTrophies.push(
        this.normalizeTrophy({ ...earnedTrophy, ...foundTitleTrophy }),
      );
    }
    return mergedTrophies;
  }

  private normalizeTrophy(trophy: Trophy) {
    return {
      trophyIconUrl: trophy.trophyIconUrl,
      detail: trophy.trophyDetail,
      isEarned: trophy.earned ?? false,
      earnedOn: trophy.earned ? trophy.earnedDateTime : 'unearned',
      type: trophy.trophyType,
      rarity: this.rarityMap[trophy.trophyRare ?? 0],
      earnedRate: Number(trophy.trophyEarnedRate),
      trophyName: trophy.trophyName,
      groupId: trophy.trophyGroupId,
    };
  }
  private rarityMap: Record<TrophyRarity, string> = {
    [TrophyRarity.VeryRare]: 'Very Rare',
    [TrophyRarity.UltraRare]: 'Ultra Rare',
    [TrophyRarity.Rare]: 'Rare',
    [TrophyRarity.Common]: 'Common',
  };
}
