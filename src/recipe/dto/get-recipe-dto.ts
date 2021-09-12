import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { RecipePrivacy, RecipeStatus } from '../recipe.enum';

export class GetRecipeDto {
  @IsOptional()
  @IsIn([RecipeStatus.OPEN, RecipeStatus.CLOSED])
  status: RecipeStatus;

  @IsOptional()
  @IsIn([RecipePrivacy.PRIVATE, RecipePrivacy.PUBLIC])
  privacy: RecipePrivacy

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
