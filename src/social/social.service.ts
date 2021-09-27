// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { CreateSocialDto } from "./dto/create-social-dto";
// import { Social } from "./social.entity";
// import { SocialRepository } from "./social.repository";

// @Injectable()
// export class SocialService {
//     constructor(
//         @InjectRepository(Social)
//         private SocialRepository: SocialRepository
//     ) { }

//     async createRecipeLike(socialDto: CreateSocialDto) {
//         return await this.SocialRepository.createRecipeLike(socialDto);
//     }
// }


import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SocialRepository } from './social.repository';
import { CreateSocialDto } from './dto/create-social-dto';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(SocialRepository)
    private SocialRepository: SocialRepository,
  ) { }
  async bookmarkRecipe(socialDto: CreateSocialDto) {
    return await this.SocialRepository.bookmarkRecipe(socialDto);
  }

  async getBookmarks(userID: number) {
    const social = this.SocialRepository.createQueryBuilder('social')
      .leftJoinAndSelect('social.recipe', 'linkedRecipes')
      .where('social.userId = :id', { id: userID });
    return await social.getMany();
  }
}