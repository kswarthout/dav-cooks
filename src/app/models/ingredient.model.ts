export interface Ingredient {
    name: string;
    preparation?: string;
    type?: string;
    note?: string;
    link?: string;
}

export interface IngredientItem {
    ingredient: Ingredient;
    quantity: string;
}