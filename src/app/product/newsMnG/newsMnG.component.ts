import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GetHttp }  from '../../core/getHttp.service'
import { SharpService } from '../../../assets/sharp.service'

//模态框组件
@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">资讯添加</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <label>资讯标题</label>
            <input type="text" class="form-control" placeholder="请输入资讯标题"  [(ngModel)]="title">
        </div>
        <div class="form-group">
            <label >资讯内容</label>
            <textarea class="form-control" rows="3" placeholder="请输入资讯内容"  [(ngModel)]="content"></textarea>
        </div>
        <div class="form-group">
            <label>关联到商品</label>
            <input type="text" class="form-control" placeholder="请输入关联到商品" [(ngModel)]="prodName">
        </div>
        <div class="form-group">
          <label>产品图片</label>
          <image-upload
              [buttonCaption]="'选择图片'"
              [dropBoxMessage]="'将图片拖放到这里！'"
              (onFileUploadFinish)="imageUploaded($event)"
          ></image-upload>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="onContentChanged()">提交</button>
        <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `,
    encapsulation: ViewEncapsulation.None,
    styleUrls:['./newsMnG.component.scss']
})
export class AddNewModalContent {
    @Input() item;
    title : string;
    content : string;
    prodName: string;
    //上传图片集合
    uploadImgLists: Array<File> = [];
    constructor(
        public activeModal: NgbActiveModal,
        private getHttp: GetHttp
    ) {}
    //将已导入的图片存入待上传数组
    imageUploaded(v){
        this.uploadImgLists.push(v.file);
        console.log(this.uploadImgLists);
    }
    //图片上传
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
        let obj = {
            "title": this.title,
            "content": this.content,
            "prodName": this.prodName,
        }
        if(this.uploadImgLists.length != 0){
            obj['imgUrl'] = 'http://image.phukienthanh.shop/' + this.uploadImgLists[0].name + "-img1";
        }
        this.upload();
        this.activeModal.dismiss(obj)
    }
    ngOnInit(){
        console.log(JSON.stringify(this.item));
        if(this.item){
          this.title = this.item['title']
          this.content = this.item['content']
          this.prodName = this.item['prodName']
        }
    }
}

//视图组件
@Component({
  selector: 'app-news',
  templateUrl: './newsMnG.component.html',
  styleUrls: ['./newsMnG.component.scss']
})
export class NewsMnGComponent{
  rows = [];
  showDeleteBtn:boolean = true;
  constructor(
        private modalService: NgbModal,
        private getHttp: GetHttp,
        private sharpService: SharpService
  ){
      this.getNews();
  }
  showDelete(){
    this.showDeleteBtn = !this.showDeleteBtn;
  }
  deleteItem(index){
    console.log(this.rows[index]);
    this.rows.splice(index, 1);
  }
  getNews(){
      this.getHttp.getData(null, this.sharpService.API.getNews).subscribe(
          res=>{
              this.rows = res
          }
      )
  }
  openProdModal(itemIndex){
    const modalRef = this.modalService.open(AddNewModalContent);
    modalRef.result.catch(red=>{
    //console.log(red)
      if(red.title||red.content||red.prodName||red.imgUrl){
        let obj = {
          "title": red.title,
          "content": red.content,
          "prodName": red.prodName,
          "imgUrl": red.imgUrl,
        }
        this.rows.push(obj);
        this.getHttp.postData(obj, this.sharpService.API.postNews).subscribe(
            res=>{
                console.log(res);
            }
        )
      }
    })
    if(this.rows[itemIndex]){
        modalRef.componentInstance.item = this.rows[itemIndex];
    }else{
        modalRef.componentInstance.item = null;
    }
  }

}
