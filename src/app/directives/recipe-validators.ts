import { FormArray } from '@angular/forms';

export class RecipeValidators {

    static ingredientsValidator(items: FormArray): any {
        items.value.forEach(element => {
            return element && (element.name === '' || element.quantity === '') ? { missingValues: true } : null;
        });
        return null;
    }

}