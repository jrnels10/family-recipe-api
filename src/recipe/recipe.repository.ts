import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { GetRecipeDto } from './dto/get-recipe-dto';
import { CreateRecipeDto } from './dto/create-recipe-dto';



@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
  private logger = new Logger('RecipeRepository');

  async getAllRecipes(filterDto: GetRecipeDto, user?: User): Promise<Recipe[]> {
    const { privacy, search } = filterDto;
    const query = this.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.social', 'linkedSocial','linkedSocial.userId = :id',{id:user.id}) // returns all the bookmarked recipes from user.
      .loadRelationCountAndMap('recipe.likes', 'recipe.social') // counts total number of socials per recipe.
      .leftJoin('recipe.photos', 'linkedPhotos')
      .addSelect(['linkedPhotos.id', 'linkedPhotos.fileName', 'linkedPhotos.fileUrl'])

    // Filter on privacy  
    if (privacy === 'public') {
      query.where('recipe.privacy = false') // return only public recipes
    }
    else if (privacy === 'private') {
      query.where('recipe.privacy = true AND recipe.userId=:id', { id: user ? user.id : -1 }) // return only public recipes
      // query.andWhere('recipe.privacy = true')
    }
    else {
      query.where('recipe.privacy = false')
      searchQuery();
      query.orWhere('recipe.userId=:id', { id: user ? user.id : -1 }) // return only public recipes
    }
    searchQuery();

    function searchQuery() {
      if (search) {
        return query.andWhere(
          '(lower(recipe.title) LIKE :search OR lower(recipe.description) LIKE :search)',
          { search: `%${search}%` },
        );
      }
    }
    try {
      const recipe = query.getMany();
      return recipe;
    } catch (error) {
      this.logger.error(`Failed to get task"`, error.stack);
      throw new InternalServerErrorException();
    }
  };

  async createRecipe(
    CreateRecipeDto: CreateRecipeDto,
    user: User,
  ): Promise<Recipe> {
    const {
      title,
      chef,
      description,
      privacy,
      cookTime,
      ingredients,
      instructions
    } = CreateRecipeDto;
    const recipe = new Recipe();
    recipe.title = title;
    recipe.chef = chef;
    recipe.privacy = privacy;
    recipe.description = description;
    recipe.user = user;
    recipe.userId = user.id;
    recipe.cookTime = cookTime;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.createDate = new Date();
    delete recipe.user;
    const r = await recipe.save();
    return r;
  }


  async getChefs(id: number): Promise<Recipe[]> {
    const query = this.createQueryBuilder('recipe')
      .select('DISTINCT ON (LOWER(recipe.chef)) recipe.chef')
      .where('recipe.userId = :id', { id })
    try {
      const recipe = await query.getRawMany();
      return recipe;
    } catch (error) {
      this.logger.error(`Failed to get task"`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}

