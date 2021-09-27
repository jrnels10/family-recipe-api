
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
      .leftJoin('linkedRecipes.photos', 'linkedPhotos')
      .addSelect(['linkedPhotos.id', 'linkedPhotos.fileName', 'linkedPhotos.fileUrl'])
      .where('social.userId = :id', { id: userID });
    return await social.getMany();
  }
}