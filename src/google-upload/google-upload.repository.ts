import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { GoogleFiles } from './google-upload.entity';
import { Recipe } from '../recipe/recipe.entity';
import { User } from 'src/auth/user.entity';

@EntityRepository(GoogleFiles)
export class GoogleUploadRepository extends Repository<GoogleFiles> {
  private logger = new Logger('GoogleFiles');

  async createImage(
    image: any,
    recipe: Recipe,
    user: User,
  ): Promise<GoogleFiles> {
    const { fileUrl, fileName, fileSize } = image;

    const photo = new GoogleFiles();
    photo.fileName = fileName;
    photo.fileUrl = fileUrl;
    photo.fileSize = fileSize;
    photo.recipe = recipe;
    photo.user = user;
    photo.recipeId = recipe.id;
    photo.createDate = new Date();

    await photo.save();

    delete photo.user;
    delete photo.recipe;
    return photo;
  }
}
