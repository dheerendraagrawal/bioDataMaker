import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BioDataComponent } from './bio-data/bio-data.component';
import { BioDataViewComponent } from './bio-data-view/bio-data-view.component';

@NgModule({
  declarations: [
    AppComponent,
    BioDataComponent,
    BioDataViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
