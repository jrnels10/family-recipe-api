import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';
import { GetRecipeDto } from './dto/get-recipe-dto';

@Controller('recipe')
export class RecipeController {
  private logger = new Logger('RecipeController');
  constructor(private recipeService: RecipeService) { }

  @Post()
  @UseGuards(AuthGuard())
  createRecipe(
    @Body() CreateRecipeDto: CreateRecipeDto,
    @GetUser() user: User,
  ): Promise<Recipe> {
    return this.recipeService.createRecipe(CreateRecipeDto, user);
  }



  @Get('getalluser')
  @UseGuards(AuthGuard())
  getAllRecipesUser(@Query(ValidationPipe) filterDto: GetRecipeDto, @GetUser() user: User) {
    return this.recipeService.getAllRecipes(filterDto, user);
  }

  @Get('getall')
  getAllRecipes(@Query(ValidationPipe) filterDto: GetRecipeDto) {
    console.log('no user login')
    return this.recipeService.getAllRecipes(filterDto);
  }

  @Get('getChefs')
  @UseGuards(AuthGuard())
  getChefs(@GetUser() user: User) {
    return this.recipeService.getChefs(user.id)
  }

  @Get('/:id')
  getRecipeById(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.getRecipeById(id);
  }
  @Get('/my/:userId')
  @UseGuards(AuthGuard())
  getMyRecipes(@Param('userId', ParseIntPipe) userId: number) {
    return this.recipeService.getMyRecipes(userId);
  }

  @Get('/like/:id') 
  @UseGuards(AuthGuard())
  likeRecipe(@Param('id') id: string) {
    // return this.recipeService.getMyRecipes(userId);
  }

  // @Patch(':id')
  // @UseGuards(AuthGuard())
  // updateRecipeStatus(
  //   @Param('id', ParseIntPipe) id: number,
  //   // @Body('status', RecipeStatusValidationPipe) status: RecipeStatus,
  //   @Body() recipe:Recipe,
  //   @GetUser() user: User,
  // ): Promise<Recipe> {
  //   return this.recipeService.updateRecipeStatus(id, recipe, user);
  // }
  

  @Patch('/updateRecipeInfo/:id')
  @UseGuards(AuthGuard())
  updateRecipeInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() Recipe: Recipe,
    @GetUser() user: User,
  ): Promise < Recipe > {
    return this.recipeService.updateRecipeInfo(id, Recipe, user);
  }
}
