import { Component, OnInit } from '@angular/core';
import { transition, trigger, style, animate, state } from '@angular/animations'; 
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormAPIService } from '../form-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  animations:[
    trigger('InoutAnimation',[
      transition('void => *',[
        style({transform:'translateX(-100%)'}),
        animate('.7s')
      ])      
    ]),
    trigger('oneStopIn',[
      transition('void => *',[
        style({transform:'translateX(-100%)'}),
        animate('.7s')
      ])
    ]),
    trigger('speedIN',[
      transition('void => *',[
        style({transform:'scale(-2.5)'}),
        animate('.7s')
      ])
    ]),
    trigger('TransparencyIN',[
      transition('void => *',[
        style({transform:'translateX(100%)'}),
        animate('.7s')
      ])
    ]),
     trigger('INOutForget',[
      transition('void => *',[
        style({transform:'scale(2.5)'}),
        animate('.5s')
      ])
    ]),
    trigger('LRAnimation',[
      transition('void => *',[
        style({transform:'translateX(-100%)'}),
        animate('.9s')
      ])
      
    ])
  ]


})
export class HomeComponent implements OnInit {

  showOneStop: boolean = false
  showSpeed: boolean = false
  showTransparency: boolean = true

  formFlag: boolean = false
  MessageIconFlag: boolean = true

  msgForm = new FormGroup({
    Name: new FormControl( null,[Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]),
    Email: new FormControl(null,[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    ContactNo: new FormControl(null,Validators.required),
    Message: new FormControl(null,Validators.required),
  });
  isShow = false;
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  oneStop()
  {
    this.showOneStop = true;
    this.showSpeed = false;
    this.showTransparency = false;
  }

  Speed()
  {
  this.showOneStop = false;
  this.showSpeed = true;
  this.showTransparency = false;
}

Transparency()
{
this.showOneStop = false;
this.showSpeed = false;
this.showTransparency = true;
}


images= ['assets/Images/1.jpg', '/assets/Images/2.jpg', '/assets/Images/3.jpg']
constructor( config: NgbCarouselConfig,private _apiService:FormAPIService) {
  config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.interval = 2000;
    config.pauseOnHover = false;
    
 }


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

