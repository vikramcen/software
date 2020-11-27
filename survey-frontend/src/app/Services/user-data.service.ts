import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userDataSource
  userData
  constructor() {
    var struser = localStorage.getItem("userData")
    console.log("struser",struser)
    var user = JSON.parse(struser)
    console.log("user",user)
    user &&( this.userDataSource = new BehaviorSubject<any>(user))
    !user &&( this.userDataSource = new BehaviorSubject<any>(null))
    this.userData = this.userDataSource.asObservable()
   }

   

  updateUser(data: Location){
    this.userDataSource.next(data);
  }
}
