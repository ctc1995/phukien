import { Component, OnInit } from '@angular/core'
import { GetHttp }  from '../core/getHttp.service'

@Component({
    template:`
        <form>
            <div class="form-group">
                <label for="type">Email address</label>
                <select id="type" class="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox">one
                </label>
                <label>
                    <input type="checkbox">two
                </label>
                <label>
                    <input type="checkbox">three
                </label>
            </div>
            <div class="form-group">
                <label for="name">商品名称</label>
                <input type="text" class="form-control" id="name" placeholder="商品名称">
            </div>
            <div class="form-group">
                <label for="price">商品价格</label>
                <input type="text" class="form-control" id="price" placeholder="商品价格">
            </div>
            <div class="form-group">
                <image-upload
                    [max]="100"
                    [buttonCaption]="'选择图片'"
                    [dropBoxMessage]="'将图片拖放到这里！'"
                    (onFileUploadFinish)="imageUploaded($event)"
                ></image-upload>
                <button type="submit" (click)="upload()">提交</button>
            </div>
            <div class="form-group">
                <label>标题</label>
                <input type="text" class="form-control" placeholder="标题">  
                <label>内容</label>              
                <textarea class="form-control" id="intro" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label>标题</label>
                <input type="text" class="form-control" placeholder="标题">  
                <label>内容</label>
                <textarea class="form-control" id="intro" rows="3"></textarea>
            </div>
            <div class="form-group">
                <div [froalaEditor]="option"  [(froalaModel)]="froalaText"></div>
            </div>
            <button type="button" class="btn btn-default" (click)="onContentChanged()"></button>
        </form>
    `
})

export class ProdMnGComponent implements OnInit{
    //上传图片集合
    uploadImgLists: Array<File>;
    froalaText: any;
    option: any;
    constructor(
        private getHttp: GetHttp
    ){
        this.uploadImgLists=[];
    }
    upload() {
      const formData: any = new FormData();
      //上传多个图片
      //上传多图情况下，采用多次发送请求方式上传
      for(let item of this.uploadImgLists){
        formData.append("uploads[]", item, item['name']);
        this.getHttp.upImage(formData).subscribe(
          files => {
            console.log('files', files)
          }
        )
      }
    }
    onContentChanged(){
        console.log(this.froalaText)
    }
    ngOnInit(){
        this.option = {
            language: "zh_cn", //配置语言
            placeholderText: "请输入内容", // 文本框提示内容
            charCounterCount: true, // 是否开启统计字数
            charCounterMax: 200, // 最大输入字数,目前只支持英文字母
            // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
            toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'underline','fontSize','color', 'strikeThrough', 'align', 'insertLink', 'insertImage', 'insertHR'],
            codeMirror: false, // 高亮显示html代码
            codeMirrorOptions: { // 配置html代码参数
                tabSize: 4
            },
            // 上传图片文件配置
            //imageUploadURL:this.questionListService.IP+"sns/uploadPhoto",//GLOBAL.INCONFIG.getIP()+接口名称,
            //imageUploadURL:"http://11.177.50.63:9999/emanager/sns/uploadPhoto",//本地路径
            //imageUploadParams:{uid:this.questionListService.userInfo.id},//接口其他传参,默认为空对象{},
            //imageUploadMethod:"POST",//POST/GET,
            //https://segmentfault.com/a/1190000008393631
        }
    }
}