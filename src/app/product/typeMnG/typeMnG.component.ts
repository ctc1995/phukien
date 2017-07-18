import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GetHttp }  from '../../core/getHttp.service'
@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">添加分类</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('Close click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
            <div class="form-group">
                <label>所属分类</label>
                <select class="form-control" [(ngModel)]="parentType">
                    <option>顶级分类</option>
                    <option *ngFor="let item of typeLists">{{item.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <label>分类名称</label>
                <input type="text" class="form-control" placeholder="请填写分类名称" [(ngModel)]="typeName"  name="typeName">
            </div>
            <div class="form-group">
                <label>分类描述</label>
                <input type="text" class="form-control" maxlength="30" placeholder="请填写分类描述" [(ngModel)]="typeDescr"  name="typeDescr">
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
    @Input() Type;
    @Input() TypeLists;
    @Input() addOredit;

    parentType :string = "顶级分类";
    typeName :string;
    typeDescr :string;
    typeLists :Array<any> = [];
    constructor(
        public activeModal: NgbActiveModal,
    ) {}
    onContentChanged(theDataCreatedByTheModal){
        this.activeModal.dismiss(
            {
                "parent": this.parentType,
                "name": this.typeName,
                "descr": this.typeDescr
            }
        );
        console.log(this.parentType, this.typeName, this.typeDescr)
    }
    ngOnInit(){
        if(this.addOredit){
            if(this.Type){
                this.parentType = this.Type.name;
            }
        }else{
            this.parentType = this.Type.parent;
            this.typeName = this.Type.name;
            this.typeDescr = this.Type.descr;
        }
        this.typeLists = this.TypeLists;
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
    forParent: string;
    isToggle: boolean =  false;
    navToggle: boolean =  true;
    resJSON: Object;
    constructor(
            private modalService: NgbModal,
            private getHttp: GetHttp
        ) { 
        /*this.treeLists =  [
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
        ];*/
    }
    ngOnInit() {
        this.getTypeLists();
    }
    getTypeLists(){
        this.getHttp.getType(null).subscribe(
            res=>{
                this.treeLists = res;
            }
        )
    }
    navtoggle(toogle:boolean){
        if(this.isToggle){
            this.navToggle = toogle;
        }
    }
    navExpand(i){
        if(this.treeLists[i]['items'].length != 0){
            this.forParent = this.treeLists[i]['name']
        }
    }
    navCollapse(){
        this.forParent = null;
    }
    addParentType(){
        const modalRef = this.modalService.open(AddTypeModalContent,{'backdrop': 'static'});
        modalRef.componentInstance.Type = null;
        modalRef.componentInstance.TypeLists = this.treeLists;
        modalRef.componentInstance.addOredit = true;
        modalRef.result.catch(red=>{
            console.log(red);
            if(red["parent"]=="顶级分类"){
                red['items'] = [];
                this.treeLists.push(red);
                this.getHttp.postType(red).subscribe(
                    res=>{
                        console.log(res);
                    }
                )
            }
            else{
                let index
                for(let item of this.treeLists){
                    if(item.name == red.parent){
                        index = this.treeLists.indexOf(item);
                        item.items.push(red);
                    }
                }
                this.getHttp.putType(this.treeLists[index]).subscribe(
                    res=>{
                        console.log(res);
                    }
                )
            }
        })
    }
    deleteItem(parentIndex, childIndex){

    }
    //添加子分类
    addChild(index){
        const modalRef = this.modalService.open(AddTypeModalContent,{'backdrop': 'static'});
        modalRef.componentInstance.Type = this.treeLists[index];
        modalRef.componentInstance.TypeLists = this.treeLists;
        modalRef.componentInstance.addOredit = true;
        modalRef.result.catch(red=>{
            for(let item of this.treeLists){
                if(item.name == red.parent){
                    item.items.push(red);
                }
            }
            this.getHttp.putType(this.treeLists[index]).subscribe(
                res=>{
                    console.log(res);
                }
            )
        })
    }
    editItem(parentIndex, childIndex){
        const modalRef = this.modalService.open(AddTypeModalContent,{'backdrop': 'static'});
        // let parentTypeLists=[];
        // for(let item of this.treeLists){
        //     parentTypeLists.push(item.text)
        // }
        modalRef.componentInstance.TypeLists = this.treeLists;
        modalRef.componentInstance.addOredit = false;
        if(childIndex == null){
            modalRef.componentInstance.Type = this.treeLists[parentIndex];
            modalRef.result.catch(red=>{
                this.treeLists[parentIndex].name = red.name;
                this.treeLists[parentIndex].descr = red.descr;
                for(let item of this.treeLists[parentIndex].items){
                    item.parent = red.name
                }
                this.getHttp.putType(this.treeLists[parentIndex]).subscribe(
                    res=>{
                        console.log(res);
                    }
                )
            })
        }else{
            modalRef.componentInstance.Type = this.treeLists[parentIndex].items[childIndex];
            modalRef.result.catch(red=>{
                this.treeLists[parentIndex].items[childIndex].name = red.name;
                this.treeLists[parentIndex].items[childIndex].descr = red.descr;
                this.getHttp.putType(this.treeLists[parentIndex]).subscribe(
                    res=>{
                        console.log(res);
                    }
                )
            })
        }
    }
}
