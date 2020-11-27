import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'survey-frontend';
  constructor(){
    localStorage.setItem("token","dwyb")
  }
  isAuthorized(){
    return localStorage.getItem("userData")
  }
}
