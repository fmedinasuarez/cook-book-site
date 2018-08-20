import { recipe } from './recipe';

export interface user {
    name: string;
    sureName: string;
    email: string;
    password: string;
    myRecipes: Array<recipe>;
    savedRecipes: Array<recipe>
}