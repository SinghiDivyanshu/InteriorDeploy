import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormAPIService {
  /* url = "http://ec2-3-85-145-39.compute-1.amazonaws.com:4500/contactUs"; */
  url = "http://localhost:4500/contactUs";
  constructor(private http: HttpClient) { }

  getContactInfo(Name: string, Email: string, Contact: string, Message: string) {
    const body = {
      name: Name,
      email: Email,
      contact: Contact,
      message: Message
    };

    //const headers = new Headers({ 'Content-Type': 'application/json' });
    //const requestOptions = new RequestOptions({ headers: headers });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post( this.url, body, httpOptions );
  }

}
