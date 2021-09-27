import { Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateSocialDto } from './dto/create-social-dto';
import { SocialService } from './social.service';

@Controller('social')
export class SocialController {
    private logger = new Logger('SocialController');
    constructor(private socialService: SocialService) { }

    @Get()
    getSocials(){
        return 'social'
    }

    @Post('bookmark/:id')
    @UseGuards(AuthGuard())
    bookmarkRecipe(
        @GetUser() user: User,
        @Param('id') id: number
    ) {
        this.socialService.bookmarkRecipe({ userId: user.id, recipeId: id })
    }

    @Get('/bookmarks')
    @UseGuards(AuthGuard())
    bookmarks(@GetUser() user: User){
       return this.socialService.getBookmarks(user.id);
    }
}
