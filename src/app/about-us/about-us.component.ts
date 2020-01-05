import { Component, OnInit } from '@angular/core';
import { transition, trigger, style, animate, state } from '@angular/animations'; 
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],



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
        animate('.9s')
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
export class AboutUsComponent implements OnInit {
  showOneStop: boolean = false
  showSpeed: boolean = false
  showTransparency: boolean = true

  

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

  constructor() { }

  ngOnInit() {
  
  
   
  }
 
  
// abc(){
//   var element = document.getElementById("aboutTitle");
//   element.addEventListener("animationstart", listener, false);
//   element.addEventListener("animationend", listener, false);
//   element.addEventListener("animationiteration", listener, false);
  
//   element.className = "slidein";
// }
}
