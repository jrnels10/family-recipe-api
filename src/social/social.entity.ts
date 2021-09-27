import { User } from "src/auth/user.entity";
import { Recipe } from "src/recipe/recipe.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Social extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column()
    userId: number;
    
    
    @Column()
    recipeId: number;

    @ManyToMany(
        () => User,
        user => user.id,
        { eager: false },
    )
    @JoinTable()
    user: User;
    @ManyToOne(
        () => Recipe,
        recipe => recipe.id,
        { eager: true },
    )
    @JoinColumn()
    recipe: Recipe;
}