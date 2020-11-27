import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttphandlerService } from "../../Services/HTTPServices/httphandler.service"

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  title:string=""
  description:string=""
  user:{}
  choices=null
  surveyType:string = null
  startDate
  endDate
  questions=[]
  
  addQuestion(){
    if(this.surveyType==="mcqs") this.questions.push({title:'',options:  [{option:"",answer:false},{option:"",answer:false}]})
    else if(this.surveyType === "shortanswer") this.questions.push({title:'',options: ""})
    else if(this.surveyType==="agreedisagree") this.questions.push({title:'',options: ""})
  }
  addChoice(i){
    this.questions[i].options.push({option:"",answer:false})
  }
  radioChange(event){
    console.log("event",event.value)
    this.surveyType= event.value
    if(event.value==="mcqs") this.questions = [{title:'',options:  [{option:'',answer:false},{option:'',answer:false}]}]
    else if(event.value === "shortanswer") this.questions = [{title:'',options: ""}]
    else if(event.value==="agreedisagree") this.questions = [{title:'',options: ""}]
  }
  saveSurvey(){
    let data={
      title       : this.title,
      description : this.description,
      type        : this.surveyType,
      questions   : this.questions,
      startDate   : this.startDate,
      endDate     : this.endDate
    }
    this.user && (data['createdBy'] = this.user)
    this.choices && (data['options'] = this.choices)
    this.http.apiPost('/survey/create',data).subscribe((res:any)=>{
      this.title=""
      this.description=""
      this.choices=null
      this.surveyType = "",
      this.startDate = this.startDate,
      this.endDate = this.endDate,
      this.questions=[]
    })
  }
  constructor(private http:HttphandlerService) {
    let userData = JSON.parse(localStorage.getItem('userData'))
    this.user = {
      name:userData.name,
      _id:userData._id
    }
    // const today = new Date();
    // const month = today.getMonth();
    // const year = today.getFullYear();

    // this.campaignOne = new FormGroup({
    //   start: new FormControl(new Date(year, month, 13)),
    //   end: new FormControl(new Date(year, month, 16))
    // });

    // this.campaignTwo = new FormGroup({
    //   start: new FormControl(new Date(year, month, 15)),
    //   end: new FormControl(new Date(year, month, 19))
    // });
  }
  
  ngOnInit(): void {
  }

}
