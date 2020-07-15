// This component is for form inputs
// User will be able to provide details need to be included in Biodata

import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ERRORS } from '../common/errors';
import { MatTableDataSource } from '@angular/material/table';
import { BioDataService } from '../services/bio-data.service';
import { ActivatedRoute , Router } from '@angular/router';

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

  oldValue;

  maxDate: Date;
  marrigeAge = 15;
  displayImageSrc = '#';

  action = 'new';

  // below variable is for dynamic naming the key names for relation list
  // tslint:disable-next-line:no-inferrable-types
  name: string = 'Name';

  constructor(private fb: FormBuilder,
              private bioDataService: BioDataService,
              private el: ElementRef,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate = new Date((this.maxDate.getFullYear() - this.marrigeAge), this.maxDate.getMonth(), this.maxDate.getDate());
    this.activatedRoute.params.subscribe((res) => {
      if (res.flag) {
        if (res.flag === 2) {
          this.oldValue = this.bioDataService.getBioData();
          if (this.oldValue.length > 0){
            this.action = 'edit';
          }
        }
      }
      this.createFormGroup();
    });
    this.createRelationMatDataSourceStructure();
  }

  // tslint:disable-next-line:typedef
  createFormGroup() {
    if ( this.action === 'edit' ) {
      this.bioData = this.fb.group({
        personalDetails: this.fb.group({
          name: new FormControl(this.oldValue.personalDetails.name , [Validators.required]),
          fName: new FormControl(this.oldValue.personalDetails.fName, [Validators.required]),
          dob: new FormControl(this.oldValue.personalDetails.dob , [Validators.required]),
          height: new FormControl(this.oldValue.personalDetails.height , [Validators.required]),
          weight: new FormControl(this.oldValue.personalDetails.weight , [Validators.required]),
          qualification: new FormControl(this.oldValue.personalDetails.qualification, [Validators.required]),
          occupation: new FormControl(this.oldValue.personalDetails.occupation, [Validators.required]),
          hobies: new FormControl(this.oldValue.personalDetails.hobbies, [Validators.required]),
          gotra: new FormControl(this.oldValue.personalDetails.gotra, [Validators.required]),
          religion: new FormControl(this.oldValue.personalDetails.religion, [Validators.required]),
          photo: new FormControl()
        }),
        familyBackground: this.fb.group({
          gFather: new FormControl(this.oldValue.familyBackground.gFather, [Validators.required]),
          fName: new FormControl(this.oldValue.familyBackground.fName, [Validators.required]),
          mName: new FormControl(this.oldValue.familyBackground.mName, [Validators.required]),
          relations: new FormControl()
        }),
        contactDetails: this.fb.group({
          phone: new FormControl(),
          address: new FormControl(this.oldValue.contactDetails.address, [Validators.required])
        })
      });
      this.phone = new MatTableDataSource(this.oldValue.contactDetails.phone);
      this.relations = new MatTableDataSource(this.oldValue.familyBackground.relations);
    }
    else{
      this.bioData = this.fb.group({
        personalDetails: this.fb.group({
          name: new FormControl('' , [Validators.required]),
          fName: new FormControl('', [Validators.required]),
          dob: new FormControl(null , [Validators.required]),
          height: new FormControl(0 , [Validators.required]),
          weight: new FormControl(0 , [Validators.required]),
          qualification: new FormControl('', [Validators.required]),
          occupation: new FormControl('', [Validators.required]),
          hobies: new FormControl('', [Validators.required]),
          gotra: new FormControl('', [Validators.required]),
          religion: new FormControl('', [Validators.required]),
          photo: new FormControl()
        }),
        familyBackground: this.fb.group({
          gFather: new FormControl('', [Validators.required]),
          fName: new FormControl('', [Validators.required]),
          mName: new FormControl('', [Validators.required]),
          relations: new FormControl()
        }),
        contactDetails: this.fb.group({
          phone: new FormControl(),
          address: new FormControl('', [Validators.required])
        })
      });
    }

    this.personalDetails = this.bioData.get('personalDetails') as FormGroup;
    this.familyBackground = this.bioData.get('familyBackground') as FormGroup;
    this.contactDetails = this.bioData.get('contactDetails') as FormGroup;
  }

  // tslint:disable-next-line:typedef
  createRelationMatDataSourceStructure() {
    this.relationsColumn = this.bioDataService.getRelationColumnNames();
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
      if (fileSelected.target.files && fileSelected.target.files[0]) {
        this.displayImageSrc = fileSelected.target.value;
        const reader = new FileReader();
        reader.onload = (r) => {
          this.displayImageSrc = r.target.result.toString();
        };
        reader.readAsDataURL(fileSelected.target.files[0]);
        this.personalDetails.get('photo').patchValue(fileSelected);
      }
  }

  // tslint:disable-next-line:typedef
  createBioData($event) {
    // if (this.bioData.valid && this.personalDetails.valid && this.familyBackground.valid && this.contactDetails.valid){
      this.familyBackground.get('relations').patchValue(this.relations.data);
      this.contactDetails.get('phone').patchValue(this.phone.data);
      this.bioDataService.setBioData(this.bioData.getRawValue());
      this.router.navigate(['old/2'], { skipLocationChange: true });
    // }
    // else {
      // alert('Please Fill all Details');
    // }
  }

  // tslint:disable-next-line:typedef
  resetForm($event) {
    this.bioData.reset();
    this.phone = new MatTableDataSource([{
      number: ''
    }]);
    this.relations = new MatTableDataSource();
  }

  // tslint:disable-next-line:typedef
  setFatherName($event){
    const h = event.target as HTMLInputElement;
    console.log(h.value);
    this.familyBackground.get('fName').patchValue(h.value);
  }

}
