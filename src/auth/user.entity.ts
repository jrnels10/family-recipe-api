import * as bcrypt from 'bcryptjs';
// import { Event } from 'src/event/event.entity';
import { Recipe } from '../recipe/recipe.entity';
import { GoogleFiles } from '../google-upload/google-upload.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    () => GoogleFiles,
    photo => photo.user,
    { eager: false },
  )
  photos: GoogleFiles[];

  @OneToMany(
    type => Recipe,
    recipe => recipe.user,
    { eager: true },
  )
  recipes: Recipe[];

  @Column({ nullable: true })
  createDate: Date;

  @Column({ nullable: true })
  updateDate: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
