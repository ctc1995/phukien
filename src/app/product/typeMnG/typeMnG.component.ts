import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">添加分类</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
            <div class="form-group">
                <label>所属分类</label>
                <select class="form-control" [(ngModel)]="parentType">
                    <option>顶级分类</option>
                    <option *ngFor="let item of TypeObj">{{item.text}}</option>
                </select>
            </div>
            <div class="form-group">
                <label>分类名称</label>
                <input type="text" class="form-control" placeholder="请填写分类名称" [(ngModel)]="typeName"  name="typeName">
            </div>
            <div class="form-group">
                <label>分类描述</label>
                <input type="text" class="form-control" placeholder="请填写分类描述" [(ngModel)]="typeDescr"  name="typeDescr">
            </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="onContentChanged(AddTypeModalContent)">提交</button>
        <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `,
    encapsulation: ViewEncapsulation.None,
})
export class AddTypeModalContent {
    @Input() TypeObj;

    parentType :string = "顶级分类";
    typeName :string;
    typeDescr :string;
    constructor(
        public activeModal: NgbActiveModal,
    ) {}
    onContentChanged(theDataCreatedByTheModal){
        this.activeModal.dismiss(
            {
                "parentType": this.parentType,
                "typeName": this.typeName,
                "typeDescr": this.typeDescr
            }
        );
        console.log(this.parentType, this.typeName, this.typeDescr)
    }
    ngOnInit(){
        
    }
}


@Component({
  selector: 'app-typemng',
  templateUrl: './typeMnG.component.html',
  styleUrls: ['./typeMnG.component.scss']
})
export class TypeMnGComponent implements OnInit {
  treeLists: Array<any> = [];
  enterNumber: number;
  isToggle: boolean =  false;
  navToggle: boolean =  true;
  resJSON: Object;
  constructor(
        private modalService: NgbModal
    ) { 
    this.treeLists =  [
        {
            id: 1,
            text: "Favorites",
            descr: "computer-icons favorites",
            items: [
                { id: 11, pid: 1, text: "Desktop", descr: "computer-icons empty-doc" },
                { id: 11, pid: 1, text: "Desktop", descr: "computer-icons empty-doc" },
                { id: 11, pid: 1, text: "Desktop", descr: "computer-icons empty-doc" },
                { id: 12, pid: 1, text: "Downloads", descr: "computer-icons downloads" }
            ]
        },
        {
            id: 2,
            text: "Favorites",
            descr: "computer-icons favorites",
            items: [
                { id: 11, pid: 2, text: "Desktop", descr: "computer-icons empty-doc" },
                { id: 12, pid: 2, text: "Downloads", descr: "computer-icons downloads" }
            ]
        },
        {
            id: 3,
            text: "Computer",
            descr: "computer-icons pc",
            expanded: false,
            items: [
                { id: 31, pid: 3, text: "Local Disk (C:)", descr: "computer-icons disk" },
                { id: 32, pid: 3, text: "Storage (D:)", descr: "computer-icons disk" }
            ]
        },
        { id: 4, text: "Network", descr: "computer-icons network", items: []},
        { id: 5, text: "Recycle Bin", descr: "computer-icons recycle", items: [] },
        {
            id: 6,
            text: "Favorites",
            descr: "computer-icons favorites",
            items: [
                { id: 11, pid: 6, text: "Desktop", descr: "computer-icons empty-doc" },
                { id: 12, pid: 6, text: "Downloads", descr: "computer-icons downloads" }
            ]
        },
        {
            id: 7,
            text: "Favorites",
            descr: "computer-icons favorites",
            items: [
                { id: 11, pid: 7, text: "Desktop", descr: "computer-icons empty-doc" },
                { id: 12, pid: 7, text: "Downloads", descr: "computer-icons downloads" }
            ]
        },
        {
            id: 8,
            text: "Favorites",
            descr: "computer-icons favorites",
            items: [
                { id: 11, pid: 8, text: "Desktop", descr: "computer-icons empty-doc" },
                { id: 12, pid: 8, text: "Downloads", descr: "computer-icons downloads" }
            ]
        },
    ];
  }
  ngOnInit() {
  }
  navtoggle(toogle:boolean){
      if(this.isToggle){
          this.navToggle = toogle;
      }
  }
  navExpand(i){
      if(this.treeLists[i]['items'].length != 0){
        this.enterNumber = this.treeLists[i]['id']
      }
  }
  navCollapse(){
      this.enterNumber = null;
  }
  addParentType(row){
    const modalRef = this.modalService.open(AddTypeModalContent);
        modalRef.result.catch(red=>{
            this.resJSON = red;
            if(this.resJSON['parentType'] == "顶级分类"){
                let obj = { id: this.treeLists.length+1, text: this.resJSON['typeName'], descr: this.resJSON['typeDescr'], items: [] }
                this.treeLists.push(obj);
            }else{
                for(let item of this.treeLists){
                    let index = this.treeLists.indexOf(item);
                    if(item.text == this.resJSON['parentType']){
                        let obj = {
                            id: index+item['items'].length,
                            text: this.resJSON['typeName'], 
                            descr: this.resJSON['typeDescr'],
                        }
                        this.treeLists[index].items.push(obj);
                        console.log(item);
                    }else{
                        console.log(item.text, this.resJSON['parentType'])
                    }
                }
            }
        })
        if(row){
            modalRef.componentInstance.TypeObj = this.treeLists;
        }else{
            modalRef.componentInstance.TypeObj = null;
        }
    }
}
