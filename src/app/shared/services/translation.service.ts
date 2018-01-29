import { Injectable } from '@angular/core';
import { Translation } from '../models/translation.model';

@Injectable()
export class TranslationService  {
    private currentCulture = "de-DE";
    private transaltions: Translation[];
    constructor() {
        this.setTranslations();
    }

    switchCulture(culture: string)
    {
        this.currentCulture = culture;
        
    }

    getTranslation(term: string, params?: string[]): string
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
        this.setTranslation("Account.UserName.Label", "Benutzername", "Username");
        this.setTranslation("Account.UserName.Hint", "Max {0} Zeichen", "Max {0} Since");
        this.setTranslation("Account.UserName.Error.Required", "Es muss ein Name eingetragen werden", "Name is required");
        this.setTranslation("Account.UserName.Error.MaxLength", "Der Name ist zu lang (aktuell {0} von {1} Zeichen)", "Name is to (currently {0} of {1} since)");
        
    }

    private setTranslation(term: string, german: string, english: string)
    {
        this.transaltions.push({Culture: "de-DE", Term: term, Translation:german });
        this.transaltions.push({Culture: "en-US", Term: term, Translation:english });
    }
}

