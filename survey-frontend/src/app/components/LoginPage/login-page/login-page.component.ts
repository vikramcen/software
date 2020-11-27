import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/Services/user-data.service';
import { HttphandlerService } from "../../../Services/HTTPServices/httphandler.service"

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private http:HttphandlerService,
    private router: Router,
    private userDataService : UserDataService,
    ) { }
  hide:Boolean = true;
  registered:Boolean= true
  email:string=""
  password:string=""
  userData=null
  
  ngOnInit(): void {
    this.userDataService.userData.subscribe(data => {
      this.userData = data;
      if(data) this.router.navigate(['/Dashboard'])
    })    
  }
  login_page(){
    console.log("login",{
      email:this.email,
      password:this.password
    })
    this.http.apiPost('/user/login',{
      email:this.email,
      password:this.password
    }).subscribe((res:any)=>{
      console.log("res",res)
      this.userDataService.updateUser(res.user)
      localStorage.setItem("token",res.token)
      localStorage.setItem("userData",JSON.stringify(res.user))
      // this.router.navigate(['/Dashboard'])
    },
    console.error
    )
  }
  handleSignUpClick(){
    // this.registered=false;
    this.router.navigate(['/signup'])
  }
}
