import { User } from "src/auth/user.entity";
import { Recipe } from "src/recipe/recipe.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Social extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(
        () => User,
        user => user.id
    )
    user: User;

    @Column()
    userId: number;

    @ManyToMany(
        () => Recipe,
        recipe => recipe.id
    )
    recipe: User;

    @Column()
    recipeId: number;
}