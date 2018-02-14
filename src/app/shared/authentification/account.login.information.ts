import { Injectable } from '@angular/core';

@Injectable()
export class AccountLoginInformation{
    private access_token: string;
    private token_type: string;
    private expires_in: number;
    private userName: string;

    constructor() {
        this.clearLoginData();
    }
    public getAccessToken() : string
    {
        return this.access_token;
    }
    public setAccountInformation(accountData: AccountLoginInformation)
    {
        this.access_token = accountData.access_token;
    }

    public clearLoginData() : void
    {
        this.access_token = null;
        this.token_type = null;
        this.expires_in = 0;
        this.userName = null; 
    }
}