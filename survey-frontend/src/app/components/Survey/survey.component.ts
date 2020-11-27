import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttphandlerService } from 'src/app/Services/HTTPServices/httphandler.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  user:{}

  constructor(private router: Router,private route: ActivatedRoute ,private http: HttphandlerService) {
    let userData = JSON.parse(localStorage.getItem('userData'))
    this.user = {
      name:userData.name,
      _id:userData._id
    }
   }
  survey:any
  ngOnInit(): void {
    this.survey = JSON.parse(this.route.snapshot.paramMap.get('survey'));
    if(this.survey.type!=='shortanswer') {
      this.survey.questions = this.survey && this.survey.questions.map(q=>{
        return { ...q, options:q.options.map(o=>{
          return {...o,answer:false}
        })}
      })
    }else{
      this.survey.questions = this.survey && this.survey.questions.map(q=>{
        return { ...q, options:['']}
      })
    }
      
  }
  saveSurvey(){
    let data=this.survey
    console.log("survey",data)

    this.user && (data['performedBy'] = this.user)
    data['surveyID']=this.survey._id
    this.http.apiPost('/surveyResponse/save',data).subscribe((res:any)=>{
      this.router.navigate(['/Dashboard']);
    })
  }

}
