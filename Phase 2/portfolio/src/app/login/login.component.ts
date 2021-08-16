import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  users:Map<string,Array<string>> = new Map([["Default",["password","Daniel","Du"]]]);
  contacts:Map<string,Array<string>> = new Map([["Default",[]]]);
  msg:string="";
  loginPage:boolean = true;
  regisPage:boolean = false;
  contactPage:boolean = false;
  current_user:string = "";
  table_content:string = "<table><tr><th>Contact Details</th></tr><tr><th>Name</th><th>Phone Number</th></tr></table>";

  constructor() { }

  ngOnInit(): void {
  }

  checkUser(loginRef:NgForm){
    let login = loginRef.value;

    if(this.users.has(login.user)){
      let password:Array<string> = this.users.get(login.user) || [""];
      if (login.pass == password[0]){
        this.changePage(2);
        this.current_user = login.user;
      }
      else{
        this.msg = "Wrong Password!"
      }
    }else {
        this.msg = "Wrong username or password!";
    }
    loginRef.reset();
  }

  regisUser(regisRef:NgForm){
    let regis = regisRef.value;
    if(this.users.has(regis.user)){
      this.msg = "Username is taken!"
    }
    else{
      this.users.set(regis.user,[regis.pass,regis.first,regis.last]);
      this.contacts.set(regis.user,[]);
      this.msg = "Added new user"
    }
    regisRef.reset();
  }

  newContact(contactRef:NgForm){
    let contact = contactRef.value;
    let arr = this.contacts.get(this.current_user) || [];
    arr.push(contact.name);
    arr.push(contact.number);
    this.contacts.set(this.current_user,arr);
    this.updateContacts();
    this.msg = "New contact added!"
  }

  updateContacts(){
    this.table_content = "<table><tr><th>Contact Details</th></tr><tr><th>Name</th><th>Phone Number</th></tr>";
    let arr = this.contacts.get(this.current_user) || [];
    for(let i = 0; i < arr.length; i += 2){
      this.table_content += "<tr><td>"+arr[i]+"</td>";
      this.table_content += "<td>"+arr[i+1]+"</td></tr>";
    }
    this.table_content += "</table>";
  }

  changePage(page:number){
    console.log("change"+page);
    if (page == 0){
      this.loginPage = true;
      this.regisPage = false;
      this.contactPage = false;
    }
    else if (page == 1){
      this.loginPage = false;
      this.regisPage = true;
      this.contactPage = false;
    }
    else{
      this.loginPage = false;
      this.regisPage = false;
      this.contactPage = true;
    }
    this.msg = "";
  }

}
