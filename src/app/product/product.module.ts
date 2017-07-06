import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadModule } from 'angular2-image-upload'
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ProductRoutingModule } from './product-routing.module'
import { ProductComponent }  from './product.component'
import { ProdMnGComponent, AddProdModalContent } from './prodMnG/prodMnG.component';
import { TypeMnGComponent, AddTypeModalContent }  from './typeMnG/typeMnG.component';
import { NewsMnGComponent, AddNewModalContent } from './newsMnG/newsMnG.component'
import { WebInfoMnGComponent } from './webinfoMnG/webinfoMnG.component'

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProductRoutingModule,
    NgbModule,
    ImageUploadModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    NgxDatatableModule
  ],
  declarations: [
    ProductComponent,
    ProdMnGComponent,
    AddProdModalContent,
    TypeMnGComponent,
    AddTypeModalContent,
    NewsMnGComponent,
    AddNewModalContent,
    WebInfoMnGComponent
  ],
  entryComponents:[
    ProductComponent,
    ProdMnGComponent,
    NewsMnGComponent,
    AddProdModalContent,
    AddTypeModalContent,
    AddNewModalContent,
  ]
})
export class ProductModule { }
