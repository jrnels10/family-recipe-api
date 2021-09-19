import { InjectRepository } from '@nestjs/typeorm';
import { RecipeRepository } from './recipe.repository';
import { GetRecipeDto } from './dto/get-recipe-dto';
import { User } from '../auth/user.entity';
import { Recipe } from './recipe.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { RecipeStatus } from './recipe.enum';

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

  async updateRecipeStatus(
    id: number,
    status: RecipeStatus,
    user: User,
  ): Promise<Recipe> {
    const recipe = await this.RecipeRepository.findOne({
      where: { id, userId: user.id },
    });
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
    recipe.title = Recipe.title;
    recipe.description = Recipe.description;
    await recipe.save();

    return recipe;
  }
}
