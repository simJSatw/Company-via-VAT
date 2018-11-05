import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { VATInfo } from '../VatInfo';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [

    /* animation for main content */
    trigger('emergeLeft', [
      transition(':enter', [
        style({
          transform: 'translateX(-200%) scale(0.7)',
          opacity: 0,

        }),
        animate('1.2s ease')
      ])
    ]),

    /* animation for .jumbotron */
    trigger('emergeRight', [
      transition(':enter', [
        style({
          transform: 'translateY(-200%)',
          opacity: 0,
        }),
        animate('.9s ease')
      ])
    ])
  ]
})

export class ResultComponent implements OnInit {

  public vatCompany: VATInfo;
  public vatForm: string;
  public flagPAth: string;
  public errMsg: boolean = false;

  constructor(private _service: DataService) { }

  ngOnInit() {
  }

  getThisVat(): void {

    /* Trimmed version of User Input */
    const formId: string = this.vatForm.trim();

    this._service.fetchVat(formId)
      .subscribe( data => {

          /* set errMsg to 'false' for EVERY new request */
          this.errMsg = false;
          this.vatCompany = data;
          const {CountryCode} = this.vatCompany;

          /* Getting flag icons for the Country Code */
          this.flagPAth = `https://www.countryflags.io/${CountryCode.toLowerCase()}/flat/32.png`;
        },
        /* error handling */
        (error) => {
          console.error(`There has been an error: ${error.message}`);
          /* Set errMsg to true to display 'NOT FOUND reference div' */
          this.errMsg = true;
        });
  }
}


