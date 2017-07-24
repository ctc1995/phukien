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
  //Logo图片上传对象
  uploadLogo: Array<File>;
  //轮播图上传对象
  uploadCor: Array<File>;

  constructor(
    private getHttp: GetHttp,
    private sharpService: SharpService,
  ) {
    this.uploadLogo=[];
    this.uploadCor=[];
  }
  //将已导入的图片存入待上传数组
  uploadFunc(flag, v){
    if(flag=='logo'){
      this.uploadLogo.push(v.file);
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
      for(let item of this.uploadLogo){
        formData.append("uploads[]", item, item['name']);
        this.getHttp.upImage(formData).subscribe(
          files => {
            console.log('files', files)
          }
        )
      }
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
        this.webInfo = res;
      }
    )
  }
  ngOnInit() {
    this.getWebInfo();
  }

}
