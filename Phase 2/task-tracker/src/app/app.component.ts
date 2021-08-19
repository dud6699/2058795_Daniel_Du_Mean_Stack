import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  taskRef = new FormGroup({
    id:new FormControl("",[Validators.required]),
    name:new FormControl("",[Validators.required]),
    task:new FormControl("",[Validators.required]),
    date:new FormControl("",[Validators.required])
  })
  
  msg:string=""
  data:Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }
  addTask() {
    let task = this.taskRef.value
    //console.log(login);
    this.data.push(task);
    this.msg = "added task";
    this.taskRef.reset();
    console.log(task.date);
  }
}
