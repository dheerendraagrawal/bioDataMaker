// This component is for form inputs
// User will be able to provide details need to be included in Biodata

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ERRORS } from '../common/errors'

@Component({
  selector: 'app-bio-data',
  templateUrl: './bio-data.component.html',
  styleUrls: ['./bio-data.component.css']
})
export class BioDataComponent implements OnInit {

  bioData : FormGroup;
  err = ERRORS;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup(){
    this.bioData = this.fb.group({
      'firstName' : new FormControl('' , [Validators.required])
    });
  }

}
