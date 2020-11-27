import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/Services/user-data.service';
import { HttphandlerService } from "../../../Services/HTTPServices/httphandler.service"
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide:Boolean = true;
  Username:string=""
  email:string=""
  password:string=""
  confirmpassword=""
  registered:Boolean= false

  constructor(
    private http:HttphandlerService,
    private router: Router,
    private userDataService : UserDataService
    ) { }

  ngOnInit(): void {
    this.userDataService.userData.subscribe(data => {
      if(data) this.router.navigate(['/Dashboard'])
    })
  }
  signUp(){
    console.log("signup",{
      name:this.Username,
      email:this.email,
      password:this.password
    })
    this.http.apiPost('/user/create',{
      name:this.Username,
      email:this.email,
      password:this.password
    }).subscribe((res:any)=>{
      console.log("res",res)
      this.userDataService.updateUser(res.user)
      localStorage.setItem("token",res.token)
      localStorage.setItem("userData",JSON.stringify(res.user))
      // this.router.navigate(['/Dashboard'])
    })
  }
  handleLoginClick(){
    this.router.navigate(['/login'])
  }

}
