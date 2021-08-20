import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  total:number = 0;
  score:number = 0;
  questionData:any = [];
  ansRef:FormGroup;  
  result = "Failed!";

  constructor(private httpClient: HttpClient, public form:FormBuilder){
    this.ansRef = new FormGroup({});
  }

  ngOnInit(): void{
    this.httpClient.get("assets/questions.json").subscribe(data =>{
      this.questionData = data;
      this.questionData.forEach((q:any) => {
        this.total += 1;
        this.ansRef?.addControl(q.question,this.form.control("",Validators.required));
      })
    })
  }

  gradeTest(){
    this.ansRef.disable();
  }

  resetTest(){
    this.ansRef.enable();
    this.ansRef.reset();
    this.score = 0;
    this.result = "Failed!";
  }

  correctAns(ans:string,corrAns:string,question:string){
    if (ans == corrAns && this.ansRef.disabled && this.ansRef.value[question] != ans){
      return true;
    }
    return false;
  }

  incorrectAns(ans:string,corrAns:string,question:string){
    if (ans != corrAns && this.ansRef.disabled && this.ansRef.value[question] == ans){
      return true;
    }
    return false;
  }

  selectedAns(ans:string,corrAns:string,question:string){
    if (ans == corrAns && this.ansRef.disabled && this.ansRef.value[question] == ans){
      this.score += 1;
      if(this.score >= 7){
        this.result = "Passed!";
      }
      return true;
    }
    return false;
  }
}
