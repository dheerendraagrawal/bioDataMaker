// This component is for form inputs
// User will be able to provide details need to be included in Biodata

import { Component, OnInit, ElementRef } from '@angular/core';
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

  displayImageSrc = '#';

  // below variable is for dynamic naming the key names for relation list
  // tslint:disable-next-line:no-inferrable-types
  name: string = 'Name';

  constructor(private fb: FormBuilder,
              private bioDataService: BioDataService,
              private el: ElementRef) { }

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
      this.relationDataStructure[name + name] = null;
    });
    const temp = Object.assign({} , this.relationDataStructure);
    this.relations.data.push(temp);
    this.relations.data = this.relations.data;
  }

  // tslint:disable-next-line:typedef
  addRelation(relation?) {
    let i = null;
    this.relations.data.every((r , index) => {
      if (r[relation + name] === null) {
        i = index;
        return false;
      }
      return true;
    });
    if (i !== null) {
      this.relations.data[i][relation + name] = '';
    }
    else{
      const temp =  Object.assign({} , this.relationDataStructure);
      temp[relation + name] = '';
      this.relations.data.push(temp);
      this.relations.data = this.relations.data;
    }
  }

  // tslint:disable-next-line:typedef
  deleteRelation(relation?, index?) {
    this.relations.data.forEach((r , i) => {
      if (this.relations.data[i][relation + name] !== null){
        if (i >= index) {
          if (i < (this.relations.data.length - 1)){
            this.relations.data[i][relation + name] = this.relations.data[i + 1][relation + name];
          }
          else {
            this.relations.data[i][relation + name] = null;
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
  openFileSelector() {
      this.el.nativeElement.querySelector('#fileBrowse').click();
  }

  // tslint:disable-next-line:typedef
  onFileSelection(fileSelected) {
      let valid = true;
      const fileExtension = fileSelected.target.files[0].name.split('.').pop().toLowerCase();
      const fileSizeInKb = fileSelected.target.files[0].size / Math.pow(1024, 1);
      if (fileSelected.target.files[0].size > 2000000) {
          valid = false;
          alert('File Size cannot be more than 2 MB');
      }
      if (valid) {
          // tslint:disable-next-line:no-string-literal
          this.personalDetails.controls['photo'].setValue(fileSelected.target.files[0]);
          // tslint:disable-next-line:no-string-literal
          this.personalDetails.controls['photo'].updateValueAndValidity();
          this.displayImageSrc = fileSelected.target.files[0].path;
      }
  }

  // tslint:disable-next-line:typedef
  createBioData($event) {
    this.bioDataService.setBioData(this.bioData.getRawValue());
  }

}
