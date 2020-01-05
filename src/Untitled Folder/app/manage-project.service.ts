import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ManageProjectService {

  url = "http://localhost:4500/projectID";
  constructor(private _http: HttpClient) { }

  retriveProject(category: string) {
    const body = {
      Category: category
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    /* return this._http.post(this.url, body, httpOptions); */
    return this._http.get(this.url + "/" + category, httpOptions);
  }


  deleteProject(projectId: string, category: string){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._http.delete(this.url +"/"+ projectId + "/"+ category, httpOptions);
  }


  retrieveImages(category: string, projectId:string)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._http.get(this.url + "/"+ category + "/" + projectId, httpOptions);
  }
}
