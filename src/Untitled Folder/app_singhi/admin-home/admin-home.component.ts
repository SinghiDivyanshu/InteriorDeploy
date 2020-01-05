import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private _router:Router) { }
 
  logout()
  {
    alert("we will meet soon...");
    sessionStorage.removeItem('admin_login_status');
    this._router.navigate(['adminlogin']);
    }

  ngOnInit() {
  }


  
}
