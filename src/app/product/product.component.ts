import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  tabLists: Array<any>=[]
  constructor() {
    this.tabLists=[
      {
        "name":"1",
        "title":"one"
      },
      {
        "name":"2",
        "title":"two"
      },
      {
        "name":"3",
        "title":"three"
      }
    ]
  }

  ngOnInit() {
  }
  
}
