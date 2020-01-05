import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ManageProjectService } from '../manage-project.service';
import { PagerService } from '../pager.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  categoryList = [];
  Projects: Array<string> = [];
  length;

  selectecCat:string; //selected category for deletion

     // pager object
     pager: any = {};

     // paged items
     pagedItems: any[];
  constructor(private _catService: CategoryService, private _manageProject: ManageProjectService,
              private _pageservice:PagerService) { }


  search(category:string){
    this.selectecCat = category;
    this._manageProject.retriveProject(category)
    .subscribe((response=>{
      const Result = response;
      for (var i = 0; i < response['length']; i++) {
        // this.Projects.push(Result[i]['projectID']);
        
        this.Projects[i] = Result[i];
      }
      console.log(this.Projects);
      
    this.length = response['length']; 
    }));
    
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {   
        return;
    }
    
    // get pager object from service
    this.pager = this._pageservice.getPager(this.length, page);

    // get current page of items
    this.pagedItems = this.Projects.slice(this.pager.startIndex, this.pager.endIndex + 1);
    
}


delete(item:string)
{
  this._manageProject.deleteProject(item, this.selectecCat)
  .subscribe((response)=>{
  if (response['result'] == 'ok')
  {
    alert('deleted sucessfully...');
    window.location.reload();
  }
    
  });
}

  ngOnInit() {
    this._catService.retriveCategory().subscribe((response) => {
      const oResult = response;
      for (var i = 0; i < response['length']; i++) {
        this.categoryList.push(oResult[i]['category']);
      }
    });

  }

}
