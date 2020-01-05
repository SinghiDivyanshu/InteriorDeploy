import { Component, OnInit } from '@angular/core';
import { AdminLoginService} from '../admin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private _adminLoginService: AdminLoginService, private _router:Router) { }

  adminId:string;
  Password:string;

  onLogin(){
    this._adminLoginService.adminVerify(this.adminId, this.Password)
    .subscribe((response)=>{
      console.log(response);
      if(response['status'] == "ok")
        {
          sessionStorage.setItem('admin_login_status', 'yes');
          this._router.navigate(['adminHome']);
        }

      else
      alert('either password or UserID is wrong');
        
    })
  }
  ngOnInit() {
  }

}
