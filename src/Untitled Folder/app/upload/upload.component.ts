import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { CategoryService } from '../category.service';
import { ProjectIDService } from '../project-id.service';
import { parseHttpResponse } from 'selenium-webdriver/http';
import { getBodyNode } from '@angular/animations/browser/src/render/shared';

/* const uri = "http://ec2-3-85-145-39.compute-1.amazonaws.com:4500/uploads"; */
const uri = "http://localhost:4500/uploads";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  UplaodDisable = true;
  CreateDisable = false;
  categoryList = [];
  attachmentList: any = [];  

  /*  uploader: FileUploader = new FileUploader({ url: uri } );
  attachmentList: any = [];

  constructor(private fb: FormBuilder, private _catService: CategoryService, private _projectId: ProjectIDService) {

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false; 
    }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, header: any) => {
      this.attachmentList.push(JSON.parse(response));
    }

  } */

  uploader:FileUploader = new FileUploader({url:uri});

    constructor(private fb: FormBuilder, private _catService: CategoryService, private _projectId: ProjectIDService){

      this.uploader.onBeforeUploadItem = (item) => {
        item.withCredentials = false; 
      }
        this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
            this.attachmentList.push(JSON.parse(response));
        }
}

  createproject( projectID:string, categoryName:string ){

    if (projectID.length == 0 )
      {
        alert("enter proper project ID");
        return;
      }
    this._projectId.createProject(projectID, categoryName).subscribe((response =>{
      console.log(response['Project']);

      if (response['Project'] == 'alreadyExist')
      {
        alert("Project ID Already exits. Change Project ID ");
      }
      else
      {
        alert("Project Created....You Can Upload image");
        this.UplaodDisable = false;
        this.CreateDisable = true;
      }
      /* if (response['result'] == 'ok')
      {
        alert("created");
      } */
    }));
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
