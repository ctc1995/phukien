import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent }  from '@swimlane/ngx-datatable/src/components/datatable.component'

import { GetHttp }  from '../../core/getHttp.service'
@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">商品添加</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <label for="type">商品分类</label>
            <select id="type" class="form-control" [(ngModel)]="prodType">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </div>
        <div class="form-group">
            <label>商品标签</label>
            <div class="checkbox" >
                <label>
                    <input type="checkbox" [(ngModel)]="flag.one" [checked]="flag.one">one
                </label>
                <label>
                    <input type="checkbox" [(ngModel)]="flag.two" [checked]="flag.two">two
                </label>
                <label>
                    <input type="checkbox" [(ngModel)]="flag.three" [checked]="flag.three">three
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="name">商品名称</label>
            <input type="text" class="form-control" id="name" placeholder="商品名称"  [(ngModel)]="prodName">
        </div>
        <div class="form-group">
            <label for="price">商品价格</label>
            <input type="number" class="form-control" id="price" placeholder="商品价格" [(ngModel)]="prodPrice">
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
        <div class="form-group">
            <label>简要描述</label>
            <div [froalaEditor]="option1"  [(froalaModel)]="froalaText1"></div>
        </div>
        <div class="form-group">
            <label>详细描述</label>
            <div [froalaEditor]="option2"  [(froalaModel)]="froalaText2"></div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="onContentChanged()">提交</button>
        <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `,
    encapsulation: ViewEncapsulation.None,
    styleUrls:['./prodMnG.component.scss']
})
export class AddProdModalContent {
    @Input() name;
    flag: Object = {
        one: false,
        two: false,
        three: true
    }
    prodType : string;
    prodName : string;
    prodPrice: number;
    prodFlag: Array<string>=[];
    //上传图片集合
    uploadImgLists: Array<File>;
    froalaText1: any;
    froalaText2: any;
    option1: any;
    option2: any;
    constructor(
        public activeModal: NgbActiveModal,
        private getHttp: GetHttp
    ) {
        this.uploadImgLists=[];
    }
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
            "prodType": this.prodType,
            "prodName": this.prodName,
            "prodPrice": this.prodPrice,
            "text1": this.froalaText1,
            "text2": this.froalaText2
        }
        if(this.uploadImgLists.length != 0){
            obj['imgUrl'] = this.uploadImgLists[0].name;
        }
        for(let key of Object.keys(this.flag)){
            if(this.flag[key]){
                this.prodFlag.push(key);
            }
        }
        obj['prodFlag'] = this.prodFlag;
        this.activeModal.dismiss(obj)
    }
    ngOnInit(){
        //富文本编辑器的配置
        this.option1 = {
            language: "zh_cn", //配置语言
            placeholderText: "请输入商品简要描述", // 文本框提示内容
            charCounterCount: true, // 是否开启统计字数
            charCounterMax: 100, // 最大输入字数,目前只支持英文字母
            // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
            toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'underline','fontSize','color'],
            //设置高度
            height: 100,
            //事件配置
            events : {
                //图片上传发生错误时执行的方法
                'froalaEditor.image.error' : function(e, editor, error, res) {
                    console.log(error);
                    console.log(res);
                }
            }
        }
        this.option2 = {
            language: "zh_cn", //配置语言
            placeholderText: "请输入内容", // 文本框提示内容
            charCounterCount: true, // 是否开启统计字数
            charCounterMax: 200, // 最大输入字数,目前只支持英文字母
            // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
            toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'underline','fontSize','color', 'strikeThrough', 'align', 'insertLink', 'insertImage', 'insertHR'],
            //设置高度
            height: 200,
            //事件配置
            events : {
                //图片上传发生错误时执行的方法
                'froalaEditor.image.error' : function(e, editor, error, res) {
                    console.log(error);
                    console.log(res);
                }
            },
            // 上传图片文件配置
            imageUploadURL:"http://192.168.30.105:3000/post/img",//本地路径
            imageUploadParam:"uploads[]",//接口其他传参,默认为file,
            imageUploadMethod:"POST",//POST/GET,
        }
        console.log(this.name);
    }
}

@Component({
    templateUrl: "./prodMnG.component.html",
    styleUrls:['./prodMnG.component.scss']
})

export class ProdMnGComponent{
    rows = [];
    temp = [];
    offset = 0;
    columns = [
        { prop: 'name' },
        { name: 'Company' },
        { name: 'Gender' }
    ];
    
    @ViewChild('table') table: DatatableComponent;
    constructor(
        private modalService: NgbModal
    ){
        this.rows=[
            {
                "name": "Milagros Finch",
                "gender": "female",
                "company": "Handshake",
                "age": 30
            },
            {
                "name": "Ericka Alvarado",
                "gender": "female",
                "company": "Lyrichord",
                "age": 25
            },
            {
                "name": "Sylvia Sosa",
                "gender": "female",
                "company": "Circum",
                "age": 26
            },
            {
                "name": "Humphrey Curtis",
                "gender": "male",
                "company": "Corepan",
                "age": 28
            }
        ]
        this.temp=[...this.rows]
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }
    openProdModal(row){
        console.log(row)
        const modalRef = this.modalService.open(AddProdModalContent);
        modalRef.result.catch(red=>{
            console.log(red);
            let obj = {
                "name": red.prodName,
                "gender": red.prodFlag[0],
                "company": red.prodType,
                "age": red.prodPrice,
            }
            this.rows.push(obj);
        })
        if(row){
            modalRef.componentInstance.name = row.name;
        }else{
            modalRef.componentInstance.name = null;
        }
    }
}
