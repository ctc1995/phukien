import { Component, OnInit } from '@angular/core';

import { SharpService } from '../../../assets/sharp.service'
import { GetHttp }  from '../../core/getHttp.service'

@Component({
  selector: 'app-webinfo',
  templateUrl: './webinfoMnG.component.html',
  styleUrls: ['./webinfoMnG.component.scss']
})
export class WebInfoMnGComponent implements OnInit {
  webInfo: Array<any>;
  webInfoNew: Object;
  phone: Object;
  phoneName: string;
  phoneNumber: string;
  lunbo: Object;
  //Logo图片上传对象
  uploadLogo: File;
  //轮播图上传对象
  uploadCor: Array<File>;

  constructor(
    private getHttp: GetHttp,
    private sharpService: SharpService,
  ) {
    this.uploadCor=[];
    this.webInfo=[];
    this.phone={};
    this.lunbo={};
    this.webInfoNew={
      phone: this.phone
    };
  }
  //将已导入的图片存入待上传数组
  uploadFunc(flag, v){
    if(flag=='logo'){
      this.uploadLogo = v.file;
      console.log(this.uploadLogo);
    }
    if(flag=="cor"){
      this.uploadCor.push(v.file);
      console.log(this.uploadCor);
    }
  }
//图片上传
  upload(flag) {
    const formData: any = new FormData();
    //上传多个图片
    //上传多图情况下，采用多次发送请求方式上传
    if(flag=="logo"){
      formData.append("uploads[]", this.uploadLogo, this.uploadLogo['name']);
      this.getHttp.upImage(formData).subscribe(
        files => {
          console.log('files', files)
        }
      )
    }
    if(flag=="cor"){
      for(let item of this.uploadCor){
        formData.append("uploads[]", item, item['name']);
        this.getHttp.upImage(formData).subscribe(
          files => {
            console.log('files', files)
          }
        )
      }
    }
  }
  getWebInfo(){
    this.getHttp.getData(null, this.sharpService.API.getWebInfo).subscribe(
      res=>{
        console.log(res);
        this.webInfo.push(res[0]);
      }
    )
  }
  updateData(){
    if(this.webInfo[0]['phone'].length != 0){
      let phoneNameArray=[];
      for(let item of this.webInfo[0]['phone']){
        phoneNameArray.push(item.name)
      }
      let phoneNameIndex = phoneNameArray.indexOf(this.phoneName);
      if(phoneNameIndex != -1){
        this.webInfo[0]['phone'][phoneNameIndex]['number'].push(this.phoneNumber);
      }
      else{
        this.phone = {
          name: this.phoneName,
          number:[]
        }
        this.phone['number'].push(this.phoneNumber)
        this.webInfo[0]['phone'].push(this.phone)
      }
    }
    else{
      this.phone = {
        name: this.phoneName,
        number:[]
      }
      this.phone['number'].push(this.phoneNumber)
      this.webInfo[0]['phone'].push(this.phone)
    }
    console.log(this.webInfo);
    this.getHttp.putData(this.webInfo[0], this.sharpService.API.putWebInfo).subscribe(
      res=>{
        console.log(res);
      }
    )
  }
  ngOnInit() {
    this.getWebInfo();
  }

}
