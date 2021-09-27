import { InjectRepository } from '@nestjs/typeorm';
import { RecipeRepository } from './recipe.repository';
import { GetRecipeDto } from './dto/get-recipe-dto';
import { User } from '../auth/user.entity';
import { Recipe } from './recipe.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe-dto';
// import { RecipeStatus } from './recipe.enum';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeRepository)
    private RecipeRepository: RecipeRepository,
  ) { }
  async getRecipeById(id: number): Promise<Recipe> {
    const found = await this.RecipeRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async getMyRecipes(userId: number): Promise<Recipe[]> {
    const found = await this.RecipeRepository.find({ where: { userId } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  
  getAllRecipes(filterDto: GetRecipeDto, user?: User): Promise<Recipe[]> {
    return this.RecipeRepository.getAllRecipes(filterDto, user);
  }
  getChefs(id: number): Promise<Recipe[]> {
    return this.RecipeRepository.getChefs(id);
  }
  createRecipe(
    CreateRecipeDto: CreateRecipeDto,
    user: User,
  ): Promise<Recipe> {
    return this.RecipeRepository.createRecipe(CreateRecipeDto, user);
  }


  bookmarkRecipe(id:number){
    return this.RecipeRepository
  }

  likeRecipe(
    user: User,
    recipeId: number
  ) {

  }

  async updateRecipe(
    id: number,
    recipe: Recipe,
    user: User,
  ): Promise<Recipe> {
    let found = await this.RecipeRepository.findOne({
      where: { id, userId: user.id },
    });

    found
    await recipe.save();
    return recipe;
  }

  async updateRecipeInfo(
    id: number,
    Recipe: Recipe,
    user: User,
  ): Promise<Recipe> {
    const recipe = await this.RecipeRepository.findOne({
      where: { id, userId: user.id },
      relations: ['photos'],
    });
    const { title, description, chef, ingredients, instructions } = Recipe;
    if (title) {
      recipe.title = Recipe.title;
    }
    if (description) {
      recipe.description = description;
    }
    if (chef) {
      recipe.chef = chef;
    }
    if (ingredients) {
      recipe.ingredients = ingredients;
    }
    if (instructions) {
      recipe.instructions = instructions;
    }
    await recipe.save();

    return recipe;
  }
}
