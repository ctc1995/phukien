import { Component, OnInit } from '@angular/core';

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
  constructor() { 
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
      if(this.treeLists[i].hasOwnProperty('items')){
        this.enterNumber = this.treeLists[i]['items'][0]['pid']
      }
  }
  navCollapse(){
      this.enterNumber = null;
  }

}
