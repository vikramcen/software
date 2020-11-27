import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mc-qs-option',
  templateUrl: './mc-qs-option.component.html',
  styleUrls: ['./mc-qs-option.component.css']
})
export class McQsOptionComponent implements OnInit {

  @Input() choices = []; 
  @Input() index:string; 

  @Input() showCheckBox:boolean; 

  @Output() choicesChange = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  changeOption(){
    this.choicesChange.emit(this.choices);
  }
  radioChangeMcqs(event){
    // this.choices[this.index].answer = event.value;
    var choices1 = this.choices
    for(let i=0;i<this.choices.length;i++){
      if(parseInt(this.index) === i){

        choices1[i] = {
          answer : true,
          option : this.choices[i].option
        }
      }
      else choices1[i] = {
        
        answer : false,
        option : this.choices[i].option
      }
    }
    this.choices = choices1
    this.choicesChange.emit(this.choices);
  }

}
