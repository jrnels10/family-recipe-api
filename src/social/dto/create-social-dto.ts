import { IsNotEmpty } from 'class-validator';

export class CreateSocialDto {
  @IsNotEmpty()
  recipeId: number;
  userId: number;
}
