import { AbstractControl } from '@angular/forms';

export class AppValidators {

    static urlValidator(url: AbstractControl): any {
        if (url.pristine || url.value === '') {
            return null;
        }

        const URL_REGEXP = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        url.markAsTouched();
        if (URL_REGEXP.test(url.value)) {
            return null;
        }
        return {
            invalidUrl: true
        };
    }

}