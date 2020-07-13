import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioDataViewComponent } from './bio-data-view.component';

describe('BioDataViewComponent', () => {
  let component: BioDataViewComponent;
  let fixture: ComponentFixture<BioDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioDataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
