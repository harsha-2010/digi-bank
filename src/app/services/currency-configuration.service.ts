import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getCurrencySymbol } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CurrencyConfigurationService {
  constructor(private http: HttpClient) { }
  // htmlcode:string='&#8377;';
  // currencyCode:string="INR";
  // currentCurrency: any;
  // currencySymbol!:string;
  // currencysymbol :string=getCurrencySymbol("USD","wide");
  currencysymbol :string = getCurrencySymbol("USD","wide"); 
}