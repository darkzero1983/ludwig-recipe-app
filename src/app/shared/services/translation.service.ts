import { Injectable } from '@angular/core';
import { Translation } from '../models/translation.model';
import { ValidationPattern } from '../models/validation.pattern.model';

@Injectable()
export class TranslationService  {
    private currentCulture = "de-DE";
    private transaltions: Translation[];
    private pattern: ValidationPattern;
    constructor() {
        this.pattern = new ValidationPattern;
        this.setTranslations();
    }

    switchCulture(culture: string)
    {
        this.currentCulture = culture;
        
    }

    get(term: string, params?: string[]): string
    {
        let translation: Translation[] = this.transaltions.filter(x => x.Culture == this.currentCulture && x.Term == term); 

        if(translation != null && translation.length > 0)
        {
            let translationString: string = translation[0].Translation;
            
            if(params != null)
            {
                for (var i = 0; i < params.length; i++) {
                    translationString = translationString.replace("{" + i + "}", params[i])
                }
            }

            return translationString;
        }
        return "";
    }

    private setTranslations()
    {
        this.transaltions = new Array<Translation>();
        this.setTranslation("Account.Headline", "Einloggen", "Login");
        this.setTranslation("Account.Button.Login", "Einloggen", "Log in");

        // Account Username
        this.setTranslation("Account.UserName.Label", "Benutzername", "Username");
        this.setTranslation("Account.UserName.Hint", "Max {0} Zeichen", "Max {0} Since");

        // Error Message
        this.setTranslation("FormControl.Error.Required", "Es muss ein Wert eingetragen werden", "Value is required");
        this.setTranslation("FormControl.Error.MaxLength", "Die Eingabe ist zu lang (aktuell {0} von {1} Zeichen)", "The value is to (currently {0} of {1} since)");
        this.setTranslation("FormControl.Error.Pattern.Default", "Die Eingabe ist nicht valide", "The value is not valid");
        this.setTranslation("FormControl.Error.Pattern." + this.pattern.Letters, "Es dürfen nur Buchstaben genommen werden", "Only letters are allowed");
        this.setTranslation("FormControl.Error.Pattern." + this.pattern.LettersNumber, "Es dürfen nur Zahlen und Buchstaben genommen werden", "Only letters and numbers are allowed");

        // Account Password
        this.setTranslation("Account.Password.Label", "Passwort", "Password");
        this.setTranslation("Account.Password.Error.Required", "Es muss ein Passwort eingetragen werden", "Password is required");

        // Account Stay Logged In
        this.setTranslation("Account.StayLoggedIn.Label", "Eingeloggt bleiben", "Stay logged in");
    }

    private setTranslation(term: string, german: string, english: string)
    {
        this.transaltions.push({Culture: "de-DE", Term: term, Translation:german });
        this.transaltions.push({Culture: "en-US", Term: term, Translation:english });
    }
}

