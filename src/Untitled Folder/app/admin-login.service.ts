import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient  } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

   /* url = "http://ec2-3-85-145-39.compute-1.amazonaws.com:4500/admin"; */
   url = "http://localhost:4500/admin";
   constructor(private http: HttpClient, private _router: Router) { }

  adminVerify(adminId:string, password:string){

    const body = {
      adminID: adminId,
      password: password,
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


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("canActivate called$$$$$--> ", sessionStorage.getItem('admin_login_status'));
//        if (sessionStorage.getItem('login_status') == undefined) {
    if (sessionStorage.getItem('admin_login_status') == undefined) {
        // user is not logged in
        this._router.navigate(['adminlogin']);
        return false;
    }

    // user is logged in
    return true;
}
}
