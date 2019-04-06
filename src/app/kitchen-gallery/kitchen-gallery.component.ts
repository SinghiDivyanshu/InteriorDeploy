import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kitchen-gallery',
  templateUrl: './kitchen-gallery.component.html',
  styleUrls: ['./kitchen-gallery.component.css']
})
export class KitchenGalleryComponent implements OnInit {


  images= ['assets/Images/homeBackground.jpg', '/assets/Images/background.jpg', '/assets/Images/kitchen-layouts-wickes-u-shape-448359.jpg']
  constructor( config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
      config.interval = 2000;
      config.pauseOnHover = false;
   }

  ngOnInit() {
  }

}
