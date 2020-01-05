import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  /* url = "http://ec2-3-85-145-39.compute-1.amazonaws.com:4500/createCat"; */
  url = "http://localhost:4500/Category";
  constructor( private _http: HttpClient) { }
  
  createCat( catName:string){
    const body = {
      catName: catName 
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.post( this.url, body, httpOptions );
  }

  retriveCategory()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this._http.get(this.url, httpOptions);
  }
}
