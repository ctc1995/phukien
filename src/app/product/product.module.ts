import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload'
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg'

import { ProductRoutingModule } from './product-routing.module'
import { ProductComponent }  from './product.component'
import { ProdMnGComponent } from './prodMnG.component'

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProductRoutingModule,
    ImageUploadModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  declarations: [
    ProductComponent,
    ProdMnGComponent
  ],
  entryComponents:[
    ProductComponent,
    ProdMnGComponent
  ]
})
export class ProductModule { }
