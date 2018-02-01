import { Injectable } from '@angular/core';
import { ValidationPattern } from '../models/validation.pattern.model';
import { TranslationService } from '../services';
import { ValidationErrors  } from '@angular/forms';

@Injectable()
export class ValidationService  {
    public pattern: ValidationPattern

    public constructor(
        private translation: TranslationService 
    ) {
        this.pattern = new ValidationPattern();
    }

    showError(error: ValidationErrors):boolean
    {
        return (error != null);
    }

    errorMessage(error: ValidationErrors):string
    {
        if(error.required != null)
        {
            return this.translation.get('FormControl.Error.Required');
        }
        if(error.minlength != null)
        {
            return this.translation.get('FormControl.Error.MinLength', [error.minlength.actualLength, error.minlength.requiredLength]);
        }
        if(error.maxlength != null)
        {
            return this.translation.get('FormControl.Error.MaxLength', [error.maxlength.actualLength, error.maxlength.requiredLength]);
        }
        if(error.pattern != null)
        {
            if(this.translation.get('FormControl.Error.Pattern.' + error.pattern.requiredPattern) != "")
            {
                return this.translation.get('FormControl.Error.Pattern.' + error.pattern.requiredPattern);
            }
            return this.translation.get('FormControl.Error.Pattern.Default');
        }
        return "";
    }
}