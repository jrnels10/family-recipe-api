import { User } from 'src/auth/user.entity';
import { Recipe } from 'src/recipe/recipe.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GoogleFiles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  fileUrl: string;

  @Column()
  fileSize: number;

  @ManyToOne(
    () => Recipe,
    recipe => recipe.photos
  )
  recipe: Recipe;

  @Column()
  recipeId: number;

  @ManyToOne(
    type => User,
    user => user.photos,
  )
  user: User;

  @Column()
  userId: number;

  @Column({ nullable: true })
  createDate: Date;

  @Column({ nullable: true })
  updateDate: Date;
}
