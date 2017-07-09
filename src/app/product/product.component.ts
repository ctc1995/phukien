import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  tabLists: Array<any>=[]
  selectIndex: number = 0;
  constructor() {
    this.tabLists=[
      {
        "name":"商品管理",
        "title":"prod"
      },
      {
        "name":"类别管理",
        "title":"type"
      },
      {
        "name":"资讯管理",
        "title":"news"
      },
      {
        "name":"网站信息",
        "title":"webinfo"
      }
    ]
  }
  select(index){
    this.selectIndex = index;
  }
  ngOnInit() {
  }
  
}
