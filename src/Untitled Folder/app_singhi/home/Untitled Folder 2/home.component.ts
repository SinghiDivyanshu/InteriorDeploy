import { Component, OnInit } from '@angular/core';
import { transition, trigger, style, animate, state } from '@angular/animations'; 


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
    ])
  ]


})
export class HomeComponent implements OnInit {

  showOneStop: boolean = false
  showSpeed: boolean = false
  showTransparency: boolean = true

  constructor() { }

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
  ngOnInit() {
  }

}
