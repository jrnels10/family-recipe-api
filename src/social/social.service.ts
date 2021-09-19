import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSocialDto } from './dto/create-social-dto';
import { Social } from './social.entity';
import { SocialRepository } from './social.repository';

@Injectable()
export class SocialService {
    constructor(
        @InjectRepository(Social)
        private SocialRepository: SocialRepository
    ) { }

    async createRecipeLike(socialDto: CreateSocialDto) {
        // return await this.SocialRepository.createRecipeLike(socialDto);
    }
}
