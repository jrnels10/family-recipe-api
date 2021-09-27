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
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Social } from 'src/social/social.entity';

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

  @Column({ nullable: true })
  bookmarks: string;

  @Column({ default: '' })
  likes: string

  @OneToMany(
    () => GoogleFiles,
    photo => photo.user,
    { eager: false },
  )
  photos: GoogleFiles[];

  @OneToMany(
    () => Recipe,
    recipe => recipe.user,
    { eager: true },
  )
  recipes: Recipe[];
  @ManyToMany(
    () => Social,
    social => social.userId,
  )
  @JoinTable()
  socials: Social[];

  @Column({ nullable: true })
  createDate: Date;

  @Column({ nullable: true })
  updateDate: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
