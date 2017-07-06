import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GetHttp }  from '../../core/getHttp.service'

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
            <input type="text" class="form-control" placeholder="请输入资讯标题"  [(ngModel)]="newsTitle">
        </div>
        <div class="form-group">
            <label >资讯内容</label>
            <textarea class="form-control" rows="3" placeholder="请输入资讯内容"  [(ngModel)]="newsContent"></textarea>
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
          <button type="submit" (click)="upload()">提交</button>
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
    newsTitle : string;
    newsContent : string;
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
            "newsTitle": this.newsTitle,
            "newsContent": this.newsContent,
            "prodName": this.prodName,
        }
        if(this.uploadImgLists.length != 0){
            obj['imgUrl'] = '../../../assets/image/' + this.uploadImgLists[0].name;
        }
        this.activeModal.dismiss(obj)
    }
    ngOnInit(){
        console.log(this.item);
        if(this.item){
          this.newsTitle = this.item['newsTitle']
          this.newsContent = this.item['newsContent']
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
      private modalService: NgbModal
  ){
      this.rows=[
          {
              "newsTitle": "XE XIAOMI NINEBOT MINI CHÍNH HÃNG XIAOMI HTTP://PHUKIENVIETTRUNG.VN/",
              "newsContent": "http://phukienviettrung.vn/",
              "prodName": "Handshake",
              "imgUrl": '../../../assets/image/1.jpg'
          },
          {
              "newsTitle": "IN ẤN, KHẮC DA TẤT CẢ CÁC SẢN PHẨM ỐP LƯNG BAO DA THEO YÊU CẦU",
              "newsContent": "PHỤ KIỆN VIỆT TRUNG Chuyên phân phối BUÔN SỈ LẺ linh phụ kiện điện thoại máy tính bảng GIÁ RẺ NHẤT. LIÊN HỆ MUA HÀNG: 09648.33333(MR. VIỆT) 0961.760.888 (MR DƯƠNG) 01686.133.888( MS. THÚY HẰNG) CAM KẾT 100% HÀI LÒNG",
              "prodName": "Lyrichord",
              "imgUrl": '../../../assets/image/2.jpg'
          },
          {
              "newsTitle": "NHẬN BIẾT PIN SẠC DỰ PHÒNG XIAOMI FAKE VÀ CHÍNH HÃNG !!!",
              "newsContent": "",
              "prodName": "Circum",
              "imgUrl": '../../../assets/image/5.jpg'
          },
          {
              "newsTitle": "HƯỚNG DẪN MUA HÀNG",
              "newsContent": "Hướng dẫn mua hàng",
              "prodName": "Corepan",
              "imgUrl": '../../../assets/image/4.jpg'
          }
      ]
  }
  showDelete(){
    this.showDeleteBtn = !this.showDeleteBtn;
  }
  deleteItem(index){
    this.rows.splice(index, 1);
    console.log(this.rows[index]);
  }
  openProdModal(itemIndex){
    const modalRef = this.modalService.open(AddNewModalContent);
    modalRef.result.catch(red=>{
      console.log(red)
      if(red.newsTitle||red.newsContent||red.prodName||red.imgUrl){
        let obj = {
          "newsTitle": red.newsTitle,
          "newsContent": red.newsContent,
          "prodName": red.prodName,
          "imgUrl": red.imgUrl,
        }
        this.rows.push(obj);
      }
    })
    if(this.rows[itemIndex]){
        modalRef.componentInstance.item = this.rows[itemIndex];
    }else{
        modalRef.componentInstance.item = null;
    }
  }

}
