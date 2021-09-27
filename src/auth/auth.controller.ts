import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Req,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  AuthCredentialsDto,
  AuthSignInCredentialsDto,
} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }


  //example of microservice
  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    console.log(data)
    return this.authService.accumulate(data)
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(authSignInCredentialsDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User) {
    return user;
  }

  @Get('/signInToken')
  @UseGuards(AuthGuard('jwt'))
  signInToken(@Req() req): { user: User } {
    const { user } = req;
    delete user.password;
    delete user.salt;
    return user;
  }
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('test', user);
  }

}
