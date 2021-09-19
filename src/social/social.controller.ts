import { Controller, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateSocialDto } from './dto/create-social-dto';
import { SocialService } from './social.service';

@Controller('social')
export class SocialController {
    private logger = new Logger('SocialController');
    constructor(private socialService: SocialService) { }

    @Post()
    @UseGuards(AuthGuard())
    createRecipeLike(
        @GetUser() user: User,
        @Param('recipeId') recipeId: number
    ) {
        this.socialService.createRecipeLike({ userId: user.id, recipeId })
    }
}
