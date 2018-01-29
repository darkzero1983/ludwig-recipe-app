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

    getTranslation(term: string, params: string[]): string
    {
        let translation: Translation[] = this.transaltions.filter(x => x.Culture == this.currentCulture && x.Term == term); 

        if(translation != null && translation.length > 0)
        {
            return translation[0].Translation;
        }
        return "";
    }

    private setTranslations()
    {
        this.transaltions = new Array<Translation>();
        this.setTranslation("Account.Headline", "Einloggen", "Login");
        this.setTranslation("Account.UserName.Label", "Benutzername", "Username");
    }

    private setTranslation(term: string, german: string, english: string)
    {
        this.transaltions.push({Culture: "de-DE", Term: term, Translation:german });
        this.transaltions.push({Culture: "en-US", Term: term, Translation:english });
    }
}

