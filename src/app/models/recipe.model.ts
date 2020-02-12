import { Ingredient } from './ingredient.model';

export interface Recipe {
    author?: string;
    cookTime?: string;
    datePublished?: string;
    description?: string;
    image?: string;
    ingredients?: Ingredient[];
    name: string;
    originalURL?: string;
    prepTime?: string;
    steps?: string[];
    tags?: string[];
    yield?: string;
}