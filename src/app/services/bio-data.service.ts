// This service is for data exchange between the
// input(bio-data.component) and design (bio-data-view.component)

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BioDataService {

  relationColumn: string[] = ['brother', 'sister', 'uncle', 'mama', 'mausi'];

  biodata;

  constructor() { }

  getRelationColumnNames(): string[] {
    return this.relationColumn;
  }

  setBioData(biodata) {
    this.biodata = biodata;
    console.log('biodata values from service');
    console.log(this.biodata);
  }
}
