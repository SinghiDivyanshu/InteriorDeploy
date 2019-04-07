import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transition, trigger, style, animate, state } from '@angular/animations'; 
import { FormAPIService } from '../form-api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations:[
    trigger('RLAnimation',[
      transition('void => *',[
        style({transform:'translateX(100%)'}),
        animate('.5s')
      ])
      
    ]),
    trigger('LRAnimation',[
      transition('void => *',[
        style({transform:'translateX(-100%)'}),
        animate('.5s')
      ])
      
    ])
  ]
})
export class ContactUSComponent implements OnInit {

  model:InfoSubmitModel={
    name: "",
    email:"",
    message:"",
    contact:""
  };

  
  constructor(private _apiService: FormAPIService ) { }
  
  onSubmit():void{
    this._apiService.getContactInfo( this.model.name, this.model.email, this.model.contact, this.model.message )
    .subscribe((response)=>{
      const result = response;  
      console.log((result)["result"]);
    });
  }

  ngOnInit() {
  }

}

export interface InfoSubmitModel
{
  name:string
  email:string
  message: string
  contact:string
}  