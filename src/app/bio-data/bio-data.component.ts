// This component is for form inputs
// User will be able to provide details need to be included in Biodata

import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ERRORS } from '../common/errors';
import { MatTableDataSource } from '@angular/material/table';
import { BioDataService } from '../services/bio-data.service';

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
    number : ''
  }]);

  relationsColumn: string[];
  phoneColumn: string[] = ['sno', 'phone', 'action'];
  err = ERRORS;

  maxDate: Date;
  marrigeAge = 15;
  displayImageSrc = '#';

  // below variable is for dynamic naming the key names for relation list
  // tslint:disable-next-line:no-inferrable-types
  name: string = 'Name';

  constructor(private fb: FormBuilder,
              private bioDataService: BioDataService,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate = new Date((this.maxDate.getFullYear() - this.marrigeAge), this.maxDate.getMonth(), this.maxDate.getDate());
    this.createFormGroup();
    this.relationsColumn = this.bioDataService.getRelationColumnNames();
    this.createMatDataSourceStructure();
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
        relations: new FormControl()
      }),
      contactDetails: this.fb.group({
        phone: new FormControl(),
        address: new FormControl()
      })
    });

    this.personalDetails = this.bioData.get('personalDetails') as FormGroup;
    this.familyBackground = this.bioData.get('familyBackground') as FormGroup;
    this.contactDetails = this.bioData.get('contactDetails') as FormGroup;
  }

  // tslint:disable-next-line:typedef
  createMatDataSourceStructure() {
    this.relationsColumn.forEach((name) => {
      this.relationDataStructure[name + this.name] = null;
    });
  }

  // tslint:disable-next-line:typedef
  addRelation(relation?) {
    let i = null;
    this.relations.data.every((r , index) => {
      if (r[relation + this.name] === null) {
        i = index;
        return false;
      }
      return true;
    });
    if (i !== null) {
      this.relations.data[i][relation + this.name] = '';
    }
    else{
      const temp =  Object.assign({} , this.relationDataStructure);
      temp[relation + this.name] = '';
      this.relations.data.push(temp);
      this.relations.data = this.relations.data;
    }
  }

  // tslint:disable-next-line:typedef
  deleteRelation(relation?, index?) {
    this.relations.data.forEach((r , i) => {
      if (this.relations.data[i][relation + this.name] !== null){
        if (i >= index) {
          if (i < (this.relations.data.length - 1)){
            this.relations.data[i][relation + this.name] = this.relations.data[i + 1][relation + this.name];
          }
          else {
            this.relations.data[i][relation + this.name] = null;
          }
        }
        return true;
      }
      return false;
    });
    let count = 0;
    Object.keys(this.relationDataStructure).forEach((key) => {
      if (this.relations.data[this.relations.data.length - 1][key] === null){
        count++;
      }
    });
    if (count === this.relationsColumn.length){
      this.relations.data = this.relations.data.splice(0, (this.relations.data.length - 1));
    }
    else {
      this.relations.data = this.relations.data;
    }
  }

  // tslint:disable-next-line:typedef
  addPhone(index) {
    this.phone.data.push({
      number: ''
    });
    this.phone.data = this.phone.data;
  }

  // tslint:disable-next-line:typedef
  deletePhone(index){
    this.phone.data = this.phone.data.filter((p , i) => {
      if (i === index){
        return false;
      }
      return true;
    });
  }

  // tslint:disable-next-line:typedef
  onFileSelection(fileSelected) {
      console.log(fileSelected);
      if (fileSelected.target.files && fileSelected.target.files[0]) {
        // tslint:disable-next-line:no-string-literal
        this.personalDetails.controls['photo'].setValue(fileSelected.target.files[0]);
        // tslint:disable-next-line:no-string-literal
        this.personalDetails.controls['photo'].updateValueAndValidity();
        this.displayImageSrc = fileSelected.target.value;
      }
  }

  // tslint:disable-next-line:typedef
  createBioData($event) {
    if (this.bioData.valid && this.personalDetails.valid && this.familyBackground.valid && this.contactDetails.valid){
      this.familyBackground.get('relations').patchValue(this.relations.data);
      this.contactDetails.get('phone').patchValue(this.phone.data);
      this.bioDataService.setBioData(this.bioData.getRawValue());
    }
    else {
      alert('Please Fill all Details');
    }
  }

}
