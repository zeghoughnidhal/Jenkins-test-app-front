import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@NgModule({
  imports: [
    MDBBootstrapModule.forRoot()
  ]
})

export class AppComponent {
  title = 'front-jenkins';
}
