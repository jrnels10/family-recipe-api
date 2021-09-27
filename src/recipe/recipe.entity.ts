import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecipeStatus } from './recipe.enum';
import { GoogleFiles } from '../google-upload/google-upload.entity';
import { Social } from 'src/social/social.entity';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  chef: string;

  @Column({ default: true })
  privacy: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  cookTime: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ nullable: true })
  ingredients: string;
  @Column({ nullable: true })
  instructions: string;

  @OneToMany(
    type => GoogleFiles,
    googleFiles => googleFiles.recipe,
    { eager: true },
  )
  @JoinTable()
  photos: GoogleFiles[];

  @ManyToOne(
    () => User,
    user => user.recipes,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

  @Column({ nullable: true })
  createDate: Date;

  @Column({ nullable: true })
  updateDate: Date;

  @OneToMany(
    ()=> Social,
    social => social.id
  )
  @JoinTable()
  social:Social[]

}
