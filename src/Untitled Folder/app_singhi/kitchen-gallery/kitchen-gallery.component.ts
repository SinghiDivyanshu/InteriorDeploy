import { Component, OnInit } from '@angular/core';
import { ManageProjectService } from '../manage-project.service';
import { Data } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-kitchen-gallery',
  templateUrl: './kitchen-gallery.component.html',
  styleUrls: ['./kitchen-gallery.component.css']
})


export class KitchenGalleryComponent implements OnInit {

  constructor(config: NgbCarouselConfig, private _projectService: ManageProjectService, private modalService: NgbModal, private _feedbackService: FeedbackService) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.interval = 2000;
    config.pauseOnHover = false;
  }

  Data = {
    project: String,
    images: []
  }
  img = [];
  selectedCat: string;
  closeResult: string; //ngmodal
  // Dataset :Object[];
  list: Data = [];


  CommentData = {
    name: String,
    feedback: String,
    rating: Number
  }

  comments = [];
  rating_readonly = true
  feedback() {
    this._feedbackService.getFeedback()
      .subscribe((response) => {
        const result = response;

        for (var i = 0; i < response['length']; i++) {
          this.comments.push({ name: result[i]['name'], feedback: result[i]['feedback'], rating: result[i]['rating'] });
        }
      });


  }


  open(content, categoryy) {
    this.img = [];
    this.selectedCat = categoryy;
    this._projectService.retrieveImages('kitchen', categoryy)
      .subscribe((response) => {
        for (let count = 0; count < response["length"]; count++)
          this.img.push(response[count]);
      });

    console.log(this.img);


    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




  ngOnInit() {
    this._projectService.retriveProject('kitchen')
      .subscribe((response) => {
        for (let count = 0; count < response["length"]; count++) {
          // this.Dataset[count].project = response[count];
          // this.Dataset[count].images.push('h');
          // this.list.push({project:response[count]});
          this._projectService.retrieveImages('kitchen', response[count])
            .subscribe((resp) => {
              this.list.push({ project: response[count], images: resp });
            });

        }
      });
    this.feedback();
  }

}
