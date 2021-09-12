import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleUploadController } from './google-upload.controller';
import { GoogleUploadService } from './google-upload.service';
import { GoogleUploadRepository } from './google-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeRepository } from '../recipe/recipe.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoogleUploadRepository, RecipeRepository]),
    AuthModule,
  ],
  controllers: [GoogleUploadController],
  providers: [GoogleUploadService],
})
export class GoogleUploadModule {}
