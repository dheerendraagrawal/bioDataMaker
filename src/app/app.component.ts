import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // tslint:disable-next-line:no-inferrable-types
  newFlag = 1;
  // tslint:disable-next-line:no-inferrable-types
  oldFlag = 1;
}
