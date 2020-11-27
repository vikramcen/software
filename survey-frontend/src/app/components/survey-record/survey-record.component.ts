import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttphandlerService } from 'src/app/Services/HTTPServices/httphandler.service';

@Component({
  selector: 'app-survey-record',
  templateUrl: './survey-record.component.html',
  styleUrls: ['./survey-record.component.css']
})
export class SurveyRecordComponent implements OnInit {

  constructor(private route: ActivatedRoute ,private router: Router ,private http:HttphandlerService) { }
  survey : any
  surveyRecords:[]
  rec:[]
  ric
  questions = []
  // shortanswerquestions=[]
  surveyType = null
  ngOnInit(): void {
    this.survey = JSON.parse(this.route.snapshot.paramMap.get('survey'))
    this.http.apiGet(`/surveyResponse/getFromSurveyID/${this.survey._id}`).subscribe((res:any)=>{
      this.surveyRecords = res.survey
      const rec = res.survey
      this.surveyType=res.survey[0].type
      if(res.survey[0].type==="agreedisagree"){
        console.log("agreedisagree")
        const ric = res.survey[0].questions.map(m=>{
          return {
            title:m.title,
            _id:m._id,
            options:[
              {option:"Agree",count:0},
              {option:'Disagree',count:0}
            ]
          }

        })
        this.questions = ric
      } else if(res.survey[0].type==="mcqs"){
        console.log("mcqs")
        this.questions = res.survey[0].questions.map(m=>{
          return {
            title:m.title,
            _id:m._id,
            options:m.options.map(op=>{return{...op,count:0}}),
          }
        })
      } else {
        console.log("shortanswer")
        this.questions = res.survey[0].questions.map(m=>{
          return {
            title:m.title,
            _id:m._id,
            options:[]
          }
        })
      }
      if(res.survey.length) for(let sur=0;sur<res.survey.length;sur++){
        for(let qno=0;qno<res.survey[sur]?.questions.length;qno++){
          for(let opt=0;opt<res.survey[sur]?.questions[qno].options.length;opt++){
            if(res.survey[sur].type==="mcqs"){
              if(res.survey[sur].questions[qno]?.options[opt].answer){
                this.questions[qno].options[opt]['count'] = this.questions[qno].options[opt]['count'] + 1
              }
            }else if(res.survey[sur].type==="agreedisagree"){
              if(res.survey[sur].questions[qno]?.options[0]==="true"){
                this.questions[qno].options[0]['count'] = this.questions[qno].options[0]['count']+1
              }else{
                this.questions[qno].options[1]['count'] = this.questions[qno].options[1]['count']+1
              }
            }else if(res.survey[sur].type==="shortanswer"){
              this.questions[qno].options.push(res.survey[sur].questions[qno].options[0])
            }
          }
        }
      }
      this.rec = rec
      
      
      // for(let i=0;i<res.survey[0].questions.length;i++){
      //   let rec={
      //     title:res.survey[0].questions[i].title,
      //     options:{...res.survey[0].questions[i].options,count:0}
      //   }
      //   for(let j=0;j<res.survey[0].questions[i].options.length;j++){
      //     for(let k=0;k<res.survey;k++){
      //       if(res.survey[k].questions[i].options[j].answer===true){
      //         rec.options[j].count++
      //         console.log("dwd",res.survey[k].questions[i].options[j].answer)
      //       }
      //     }
      //   }
      //   console.log("rec",rec)
      // }
    })

  }
  round(r){
    return Math.round(r*100)/100
  }
  export_xlsx(element) {
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
  
    tab_text = tab_text + '<x:Name>Record Sheet</x:Name>';
  
    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
  
    tab_text = tab_text + "<table border='1px'>";
    tab_text = tab_text + document.getElementById(element).innerHTML;
    tab_text = tab_text + '</table></body></html>';
  
    var data_type = 'data:application/vnd.ms-excel';
  
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
  
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, 'Record.xls');
        }
    } else {
      var downloadLink = document.createElement("a");
      document.body.appendChild(downloadLink);
      downloadLink.href = data_type + ', ' + encodeURIComponent(tab_text);
          downloadLink.download = 'Test file.xls';
          downloadLink.click();
    }
  }

}
