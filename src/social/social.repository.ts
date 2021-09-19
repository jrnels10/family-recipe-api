import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { Social } from './social.entity';
import { CreateSocialDto } from './dto/create-social-dto';

@EntityRepository(Social)
export class SocialRepository extends Repository<Social> {
    private logger = new Logger('SocialRepository')

    async createRecipeLike(
        socialDto: CreateSocialDto
    ) {
        // Check to see if user has already liked recipe
        const found = await this.findOne({ ...socialDto });
        if (found) {
            // If user already liked recipe and has selected to 'unlike' recipe
            // then delete like from social
            this.delete(found.id)
        } else {
            // Otherwise create record for that new like from user.
            const social = this.create({ ...socialDto });
            try {
                await social.save();
            } catch (error) {
                console.log(error);
                if (error.code === '23505') {
                    // duplicate username
                    throw new ConflictException('social already exist');
                } else {
                    throw new InternalServerErrorException();
                }
            }
        }
    }
}