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
        <form>
            <div class="form-group">
                <label for="type">商品分类</label>
                <select id="type" class="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
            <div class="form-group">
                <label>商品标签</label>
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
                <div [froalaEditor]="option1"  [(froalaModel)]="froalaText"></div>
            </div>
            <div class="form-group">
                <label>详细描述</label>
                <div [froalaEditor]="option2"  [(froalaModel)]="froalaText"></div>
            </div>
        </form>
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
    //上传图片集合
    uploadImgLists: Array<File>;
    froalaText: any;
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
        console.log(this.froalaText)
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
                "name": "Ethel Price",
                "gender": "female",
                "company": "Johnson, Johnson and Partners, LLC CMP DDC",
                "age": 22
            },
            {
                "name": "Claudine Neal",
                "gender": "female",
                "company": "Sealoud",
                "age": 55
            },
            {
                "name": "Beryl Rice",
                "gender": "female",
                "company": "Velity",
                "age": 67
            },
            {
                "name": "Wilder Gonzales",
                "gender": "male",
                "company": "Geekko"
            },
            {
                "name": "Georgina Schultz",
                "gender": "female",
                "company": "Suretech"
            },
            {
                "name": "Carroll Buchanan",
                "gender": "male",
                "company": "Ecosys"
            },
            {
                "name": "Valarie Atkinson",
                "gender": "female",
                "company": "Hopeli"
            },
            {
                "name": "Schroeder Mathews",
                "gender": "male",
                "company": "Polarium"
            },
            {
                "name": "Lynda Mendoza",
                "gender": "female",
                "company": "Dogspa"
            },
            {
                "name": "Sarah Massey",
                "gender": "female",
                "company": "Bisba"
            },
            {
                "name": "Robles Boyle",
                "gender": "male",
                "company": "Comtract"
            },
            {
                "name": "Evans Hickman",
                "gender": "male",
                "company": "Parleynet"
            },
            {
                "name": "Dawson Barber",
                "gender": "male",
                "company": "Dymi"
            },
            {
                "name": "Bruce Strong",
                "gender": "male",
                "company": "Xyqag"
            },
            {
                "name": "Nellie Whitfield",
                "gender": "female",
                "company": "Exospace"
            },
            {
                "name": "Jackson Macias",
                "gender": "male",
                "company": "Aquamate"
            },
            {
                "name": "Pena Pena",
                "gender": "male",
                "company": "Quarx"
            },
            {
                "name": "Lelia Gates",
                "gender": "female",
                "company": "Proxsoft"
            },
            {
                "name": "Letitia Vasquez",
                "gender": "female",
                "company": "Slumberia"
            },
            {
                "name": "Trevino Moreno",
                "gender": "male",
                "company": "Conjurica"
            },
            {
                "name": "Barr Page",
                "gender": "male",
                "company": "Apex"
            },
            {
                "name": "Kirkland Merrill",
                "gender": "male",
                "company": "Utara"
            },
            {
                "name": "Blanche Conley",
                "gender": "female",
                "company": "Imkan"
            },
            {
                "name": "Atkins Dunlap",
                "gender": "male",
                "company": "Comveyor"
            },
            {
                "name": "Everett Foreman",
                "gender": "male",
                "company": "Maineland"
            },
            {
                "name": "Gould Randolph",
                "gender": "male",
                "company": "Intergeek"
            },
            {
                "name": "Kelli Leon",
                "gender": "female",
                "company": "Verbus"
            },
            {
                "name": "Freda Mason",
                "gender": "female",
                "company": "Accidency"
            },
            {
                "name": "Tucker Maxwell",
                "gender": "male",
                "company": "Lumbrex"
            },
            {
                "name": "Yvonne Parsons",
                "gender": "female",
                "company": "Zolar"
            },
            {
                "name": "Woods Key",
                "gender": "male",
                "company": "Bedder"
            },
            {
                "name": "Stephens Reilly",
                "gender": "male",
                "company": "Acusage"
            },
            {
                "name": "Mcfarland Sparks",
                "gender": "male",
                "company": "Comvey"
            },
            {
                "name": "Jocelyn Sawyer",
                "gender": "female",
                "company": "Fortean"
            },
            {
                "name": "Renee Barr",
                "gender": "female",
                "company": "Kiggle"
            },
            {
                "name": "Gaines Beck",
                "gender": "male",
                "company": "Sequitur"
            },
            {
                "name": "Luisa Farrell",
                "gender": "female",
                "company": "Cinesanct"
            },
            {
                "name": "Robyn Strickland",
                "gender": "female",
                "company": "Obones"
            },
            {
                "name": "Roseann Jarvis",
                "gender": "female",
                "company": "Aquazure"
            },
            {
                "name": "Johnston Park",
                "gender": "male",
                "company": "Netur"
            },
            {
                "name": "Wong Craft",
                "gender": "male",
                "company": "Opticall"
            },
            {
                "name": "Merritt Cole",
                "gender": "male",
                "company": "Techtrix"
            },
            {
                "name": "Dale Byrd",
                "gender": "female",
                "company": "Kneedles"
            },
            {
                "name": "Sara Delgado",
                "gender": "female",
                "company": "Netagy"
            },
            {
                "name": "Alisha Myers",
                "gender": "female",
                "company": "Intradisk"
            },
            {
                "name": "Felecia Smith",
                "gender": "female",
                "company": "Futurity"
            },
            {
                "name": "Neal Harvey",
                "gender": "male",
                "company": "Pyramax"
            },
            {
                "name": "Nola Miles",
                "gender": "female",
                "company": "Sonique"
            },
            {
                "name": "Herring Pierce",
                "gender": "male",
                "company": "Geeketron"
            },
            {
                "name": "Shelley Rodriquez",
                "gender": "female",
                "company": "Bostonic"
            },
            {
                "name": "Cora Chase",
                "gender": "female",
                "company": "Isonus"
            },
            {
                "name": "Mckay Santos",
                "gender": "male",
                "company": "Amtas"
            },
            {
                "name": "Hilda Crane",
                "gender": "female",
                "company": "Jumpstack"
            },
            {
                "name": "Jeanne Lindsay",
                "gender": "female",
                "company": "Genesynk"
            },
            {
                "name": "Frye Sharpe",
                "gender": "male",
                "company": "Eplode"
            },
            {
                "name": "Velma Fry",
                "gender": "female",
                "company": "Ronelon"
            },
            {
                "name": "Reyna Espinoza",
                "gender": "female",
                "company": "Prismatic"
            },
            {
                "name": "Spencer Sloan",
                "gender": "male",
                "company": "Comverges"
            },
            {
                "name": "Graham Marsh",
                "gender": "male",
                "company": "Medifax"
            },
            {
                "name": "Hale Boone",
                "gender": "male",
                "company": "Digial"
            },
            {
                "name": "Wiley Hubbard",
                "gender": "male",
                "company": "Zensus"
            },
            {
                "name": "Blackburn Drake",
                "gender": "male",
                "company": "Frenex"
            },
            {
                "name": "Franco Hunter",
                "gender": "male",
                "company": "Rockabye"
            },
            {
                "name": "Barnett Case",
                "gender": "male",
                "company": "Norali"
            },
            {
                "name": "Alexander Foley",
                "gender": "male",
                "company": "Geekosis"
            },
            {
                "name": "Lynette Stein",
                "gender": "female",
                "company": "Macronaut"
            },
            {
                "name": "Anthony Joyner",
                "gender": "male",
                "company": "Senmei"
            },
            {
                "name": "Garrett Brennan",
                "gender": "male",
                "company": "Bluegrain"
            },
            {
                "name": "Betsy Horton",
                "gender": "female",
                "company": "Zilla"
            },
            {
                "name": "Patton Small",
                "gender": "male",
                "company": "Genmex"
            },
            {
                "name": "Lakisha Huber",
                "gender": "female",
                "company": "Insource"
            },
            {
                "name": "Lindsay Avery",
                "gender": "female",
                "company": "Unq"
            },
            {
                "name": "Ayers Hood",
                "gender": "male",
                "company": "Accuprint"
            },
            {
                "name": "Torres Durham",
                "gender": "male",
                "company": "Uplinx"
            },
            {
                "name": "Vincent Hernandez",
                "gender": "male",
                "company": "Talendula"
            },
            {
                "name": "Baird Ryan",
                "gender": "male",
                "company": "Aquasseur"
            },
            {
                "name": "Georgia Mercer",
                "gender": "female",
                "company": "Skyplex"
            },
            {
                "name": "Francesca Elliott",
                "gender": "female",
                "company": "Nspire"
            },
            {
                "name": "Lyons Peters",
                "gender": "male",
                "company": "Quinex"
            },
            {
                "name": "Kristi Brewer",
                "gender": "female",
                "company": "Oronoko"
            },
            {
                "name": "Tonya Bray",
                "gender": "female",
                "company": "Insuron"
            },
            {
                "name": "Valenzuela Huff",
                "gender": "male",
                "company": "Applideck"
            },
            {
                "name": "Tiffany Anderson",
                "gender": "female",
                "company": "Zanymax"
            },
            {
                "name": "Jerri King",
                "gender": "female",
                "company": "Eventex"
            },
            {
                "name": "Rocha Meadows",
                "gender": "male",
                "company": "Goko"
            },
            {
                "name": "Marcy Green",
                "gender": "female",
                "company": "Pharmex"
            },
            {
                "name": "Kirk Cross",
                "gender": "male",
                "company": "Portico"
            },
            {
                "name": "Hattie Mullen",
                "gender": "female",
                "company": "Zilencio"
            },
            {
                "name": "Deann Bridges",
                "gender": "female",
                "company": "Equitox"
            },
            {
                "name": "Chaney Roach",
                "gender": "male",
                "company": "Qualitern"
            },
            {
                "name": "Consuelo Dickson",
                "gender": "female",
                "company": "Poshome"
            },
            {
                "name": "Billie Rowe",
                "gender": "female",
                "company": "Cemention"
            },
            {
                "name": "Bean Donovan",
                "gender": "male",
                "company": "Mantro"
            },
            {
                "name": "Lancaster Patel",
                "gender": "male",
                "company": "Krog"
            },
            {
                "name": "Rosa Dyer",
                "gender": "female",
                "company": "Netility"
            },
            {
                "name": "Christine Compton",
                "gender": "female",
                "company": "Bleeko"
            },
            {
                "name": "Milagros Finch",
                "gender": "female",
                "company": "Handshake"
            },
            {
                "name": "Ericka Alvarado",
                "gender": "female",
                "company": "Lyrichord"
            },
            {
                "name": "Sylvia Sosa",
                "gender": "female",
                "company": "Circum"
            },
            {
                "name": "Humphrey Curtis",
                "gender": "male",
                "company": "Corepan"
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
        const modalRef = this.modalService.open(AddProdModalContent);
        if(row){
            modalRef.componentInstance.name = row.name;
        }else{
            modalRef.componentInstance.name = null;
        }
    }
}
