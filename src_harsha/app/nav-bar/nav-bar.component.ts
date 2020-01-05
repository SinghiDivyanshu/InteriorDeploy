import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormAPIService } from '../form-api.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  formFlag: boolean = false
  MessageIconFlag: boolean = true

  msgForm = new FormGroup({
    Name: new FormControl( null,[Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]),
    Email: new FormControl(null,[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    ContactNo: new FormControl(null,Validators.required),
    Message: new FormControl(null,Validators.required),
  });


  constructor( private _apiService:FormAPIService) { }

  ngOnInit() {
  }

  sendMsg(){
    if (this.formFlag == true )
    {
      this.formFlag = false
      this.MessageIconFlag = true
    } 
    else 
      {
        this.formFlag = true
        this.MessageIconFlag = false
      }
  }

  onSubmit():void{
    const arr = this.msgForm.value;

    this._apiService.getContactInfo( arr.Name, arr.Email, arr.ContactNo, arr.Message )
    .subscribe((response)=>{
      const result = response;  
      console.log((result)["result"]);
    });
  }

  onCancel()
  {
    if (this.formFlag == true )
    {
      this.formFlag = false
      this.MessageIconFlag = true
    }

  }

 


}
