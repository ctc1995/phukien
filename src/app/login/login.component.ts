import { Component, OnInit } from '@angular/core'
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
  loginInfo : any;
  regInfo : string;
  constructor(
    private loginService: LoginService,
    private http: Http,
  ) {}
  private login(){
    this.loginService.loginPost(this.user, this.psd).then(
      res =>{
        console.log(res)
        this.loginInfo = res
      }
    )
    .catch()
  }
  // private reg(){
  //   this.loginService.loginPost(this.user, this.psd).then(
  //     res =>{
  //       console.log(res)
  //       this.loginInfo = res
  //     }
  //   ).catch()
  // }
  // imageUploaded(v){
  //   this.uploadImgLists.push(v.file);
  // }
  ngOnInit() {
  }

}
