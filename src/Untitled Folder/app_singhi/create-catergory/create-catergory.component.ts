import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-create-catergory',
  templateUrl: './create-catergory.component.html',
  styleUrls: ['./create-catergory.component.css']
})
export class CreateCatergoryComponent implements OnInit {

  
  constructor( private _catService: CategoryService) { }

  create( categoryName:string)
  {
    this._catService.createCat(categoryName)
    .subscribe((response)=>{
      /* console.log(response['result']); */
      if (response['result'] == 'ok')
      {
        alert("created");
      }
    });
  }
  ngOnInit() {
  }

}
