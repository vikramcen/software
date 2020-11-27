import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttphandlerService } from 'src/app/Services/HTTPServices/httphandler.service';

@Component({
  selector: 'app-my-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class MySurveyComponent implements OnInit {

  user={_id:"",name:""}
  surveys=[]

  limit = 10;
  skip = 0;
  count = 0
  totalDocCounts=0

  constructor(private router: Router,private http:HttphandlerService) { 
    let userData = JSON.parse(localStorage.getItem('userData'))
    if(userData) {
      this.user = {
        name:userData.name,
        _id:userData._id
      }
    }else{
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    this.http.apiGet(`/user/survey/${this.user._id}/${this.limit}/${this.skip}`).subscribe((res:any)=>{
      this.surveys = res.survey
      this.count = res.count
    })
  }

  navigateToCreate(){
    this.router.navigate(['/CreateSurvey']);
  }
  navigateToRecord(survey){
    this.router.navigate(['/SurveyRecord' ,{survey:JSON.stringify(survey)}]);
  }
  handlePage(event){
    console.log("event",event)
  }

}
