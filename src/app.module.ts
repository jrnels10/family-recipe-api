import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthController } from './auth/auth.controller';
import { GoogleUploadModule } from './google-upload/google-upload.module';

@Module({
  imports: [RecipeModule, AuthModule, TypeOrmModule.forRoot(typeOrmConfig), GoogleUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
