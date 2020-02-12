import { IngredientItem } from './ingredient.model';

export interface Recipe {
    author?: string;
    cookTime?: string;
    datePublished?: string;
    description?: string;
    id?: string;
    image?: string;
    ingredients?: IngredientItem[];
    name: string;
    notes?: string;
    originalURL?: string;
    prepTime?: string;
    steps?: string[];
    tags?: string[];
    yield?: string;
}