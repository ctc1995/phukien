//登陆模块路由模块文件
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProductComponent } from './product.component'
import { ProdMnGComponent } from './prodMnG.component'

const routes:Routes=[
    {
        path: '',
        component: ProductComponent,
        children:[
            {
                path: 'one',
                component: ProdMnGComponent
            }
        ]
    }
]
@NgModule({
    imports:[
        RouterModule.forChild(routes),
    ],
    exports:[
        RouterModule
    ]
})
export class ProductRoutingModule{}