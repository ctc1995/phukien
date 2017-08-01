import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Http } from '@angular/http'

import { LoginService } from './login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: string;
  psd: string;
  regInfo : string;
  constructor(
    private loginService: LoginService,
    private http: Http,
    private router: Router,
  ) {}
  private login(){
    this.loginService.loginPost(this.user, this.psd).then(
      res =>{
        if(res){
          this.router.navigate(['/product/prod'])
        }
      }
    )
    .catch()
  }
  ngOnInit() {
  }

}
