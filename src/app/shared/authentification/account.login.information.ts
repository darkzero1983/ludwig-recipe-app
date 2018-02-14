import { Injectable } from '@angular/core';

@Injectable()
export class AccountLoginInformation{
    public access_token: string;
    public token_type: string;
    public expires_in: number;
    public userName: string;
}