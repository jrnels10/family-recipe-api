import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { RecipeBookmarked, RecipePrivacy } from '../recipe.enum';

export class GetRecipeDto {

  @IsOptional()
  @IsIn([RecipePrivacy.PRIVATE, RecipePrivacy.PUBLIC])
  privacy: RecipePrivacy

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
