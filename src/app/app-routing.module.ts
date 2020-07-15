import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BioDataComponent } from './bio-data/bio-data.component';
import { BioDataViewComponent } from './bio-data-view/bio-data-view.component';
import { AboutComponent } from './about/about/about.component';

const routes: Routes = [{
    path: '',
    component: AboutComponent
  }, {
    path: 'new/:flag',
    component: BioDataComponent
  }, {
    path: 'old/:flag',
    component: BioDataViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
