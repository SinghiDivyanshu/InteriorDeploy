import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectIDService {

  /* url = "http://ec2-3-85-145-39.compute-1.amazonaws.com:4500/projectID"; */
  url = "http://localhost:4500/createProject";

  constructor( private _http:HttpClient) { }

  createProject( projectID: string, categoryName: string)
  {
    const body = {
      projectID: projectID,
      categoryName: categoryName
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.post(this.url, body, httpOptions);
  }
}
