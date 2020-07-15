import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BioDataComponent } from './bio-data/bio-data.component';
import { BioDataViewComponent } from './bio-data-view/bio-data-view.component';
import { AboutComponent } from './about/about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';

const routes: Routes = [{
    path: '',
    component: AboutComponent
  }, {
    path: 'new/:flag',
    component: BioDataComponent
  }, {
    path: 'old/:flag',
    component: BioDataViewComponent
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
