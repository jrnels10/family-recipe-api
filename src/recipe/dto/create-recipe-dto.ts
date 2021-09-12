import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  title: string;
  chef: string;
  privacy:boolean;
  description: string;
  cookTime: string;
  ingredients:string;
  instructions:string;
}
