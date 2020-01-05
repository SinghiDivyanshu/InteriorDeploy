import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
   /* url = "http://ec2-3-85-145-39.compute-1.amazonaws.com:4500/contactUs"; */
   url = "http://localhost:4500/Feedback";
   constructor(private http: HttpClient) { }
 
   
   getFeedback(){
    const body = {
    
    }; 

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.get( this.url, httpOptions );
   }


   InsertFeedback(name:String, feedback:String, rating:Number){

    const body = {
      name: name,
      feedback: feedback,
      rating:rating
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
