import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GetHttp }  from '../../core/getHttp.service'
import { SharpService } from '../../../assets/sharp.service'
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
            private getHttp: GetHttp,
            private sharpService: SharpService
        ) {}
    ngOnInit() {
        this.getTypeLists();
    }
    getTypeLists(){
        this.getHttp.getData(null, this.sharpService.API.getType).subscribe(
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
                this.getHttp.postData(red, this.sharpService.API.postType).subscribe(
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
                this.getHttp.putData(this.treeLists[index], this.sharpService.API.putType).subscribe(
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
            this.getHttp.putData(this.treeLists[index], this.sharpService.API.putType).subscribe(
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
                this.getHttp.putData(this.treeLists[parentIndex], this.sharpService.API.putType).subscribe(
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
                this.getHttp.putData(this.treeLists[parentIndex], this.sharpService.API.putType).subscribe(
                    res=>{
                        console.log(res);
                    }
                )
            })
        }
    }
}
