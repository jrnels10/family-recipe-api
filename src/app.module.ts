import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { GoogleUploadModule } from './google-upload/google-upload.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [RecipeModule, AuthModule, SocialModule, TypeOrmModule.forRoot(typeOrmConfig), GoogleUploadModule, SocialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
