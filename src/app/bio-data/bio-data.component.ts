// This component is for form inputs
// User will be able to provide details need to be included in Biodata

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ERRORS } from '../common/errors';
import { MatTableDataSource } from '@angular/material/table';
import { BioDataService } from '../services/bio-data.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-bio-data',
  templateUrl: './bio-data.component.html',
  styleUrls: ['./bio-data.component.css']
})
export class BioDataComponent implements OnInit {

  bioData: FormGroup;
  personalDetails: FormGroup;
  familyBackground: FormGroup;
  contactDetails: FormGroup;

  relationDataStructure = {};
  relations = new MatTableDataSource([]);

  phone = new MatTableDataSource([{
    number : '23'
  }]);

  relationsColumn: string[];
  phoneColumn: string[] = ['sno', 'phone', 'action'];
  err = ERRORS;

  constructor(private fb: FormBuilder,
              private bioDataService: BioDataService) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.relationsColumn = this.bioDataService.getRelationColumnNames();
    this.createMatDataSource();
  }

  // tslint:disable-next-line:typedef
  createFormGroup() {
    this.bioData = this.fb.group({
      personalDetails: this.fb.group({
        name: new FormControl('' , [Validators.required]),
        fName: new FormControl('', [Validators.required]),
        dob: new FormControl(),
        height: new FormControl(),
        weight: new FormControl(),
        qualification: new FormControl(),
        occupation: new FormControl(),
        hobies: new FormControl(),
        gotra: new FormControl(),
        religion: new FormControl(),
        photo: new FormControl()
      }),
      familyBackground: this.fb.group({
        gFather: new FormControl(),
        fName: new FormControl(),
        mName: new FormControl(),
        relations: new FormControl(this.relations.data)
      }),
      contactDetails: this.fb.group({
        phone: new FormControl(this.phone.data),
        address: new FormControl()
      })
    });

    this.personalDetails = this.bioData.get('personalDetails') as FormGroup;
    this.familyBackground = this.bioData.get('familyBackground') as FormGroup;
    this.contactDetails = this.bioData.get('contactDetails') as FormGroup;
  }

  // tslint:disable-next-line:typedef
  createMatDataSource() {
    this.relationsColumn.forEach((name) => {
      this.relationDataStructure[name + 'Name'] = null;
    });
    const temp = Object.assign({} , this.relationDataStructure);
    this.relations.data.push(temp);
    this.relations.data = this.relations.data;
  }

  // tslint:disable-next-line:typedef
  addRelation(relation?) {
    let i = null;
    this.relations.data.every((r , index) => {
      if (r[relation + 'Name'] === null) {
        i = index;
        return false;
      }
      return true;
    });
    if (i !== null) {
      this.relations.data[i][relation + 'Name'] = '';
    }
    else{
      const temp =  Object.assign({} , this.relationDataStructure);
      temp[relation + 'Name'] = '';
      this.relations.data.push(temp);
      this.relations.data = this.relations.data;
    }
  }

  deleteRelation(relation?, index?) {
    this.relations.data.forEach((r , i) => {
      if (this.relations.data[i][relation + 'Name'] !== null){
        if (i >= index) {
          if (i < (this.relations.data.length - 1)){
            this.relations.data[i][relation + 'Name'] = this.relations.data[i + 1][relation + 'Name'];
          }
          else {
            this.relations.data[i][relation + 'Name'] = null;
          }
        }
        return true;
      }
      return false;
    });
    this.relations.data = this.relations.data;
  }

}
