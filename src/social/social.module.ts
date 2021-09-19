import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { AuthModule } from "src/auth/auth.module";
import { SocialController } from "./social.controller";
import { SocialRepository } from "./social.repository";
import { SocialService } from "./social.service";
import { RecipeModule } from "src/recipe/recipe.module";

@Module({
  imports: [TypeOrmModule.forFeature([SocialRepository]), RecipeModule, AuthModule],
  controllers: [SocialController],
  providers: [SocialService]
})
export class SocialModule { }
