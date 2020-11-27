import { Component, OnInit } from '@angular/core';
import { HttphandlerService } from 'src/app/Services/HTTPServices/httphandler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http:HttphandlerService) { }
  user:{
    name:"",
    email:"",
    _id:"",
    password:""
  }
  hide = true
  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem('userData'))
    if(userData){
      this.user = {
        name:userData.name,
        _id:userData._id,
        email:userData.email,
        password:""
      }
    }else{
      this.http.apiPost('/users/logout',{}).subscribe((res:any)=>{
        localStorage.clear();
      })
    }
    
  }
  updateUser(){
    let data={
      name: this.user.name,
      email:this.user.email
    }
    if(this.user.password.length>6) data["password"] = this.user.password;

    this.http.apiPost('/users/me',data).subscribe((res:any)=>{
      console.log("rees",res)
    })
  }

}
