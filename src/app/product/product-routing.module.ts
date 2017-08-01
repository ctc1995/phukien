//登陆模块路由模块文件
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProductComponent } from './product.component'
import { ProdMnGComponent } from './prodMnG/prodMnG.component'
import { TypeMnGComponent } from './typeMnG/typeMnG.component'
import { NewsMnGComponent } from './newsMnG/newsMnG.component'
import { WebInfoMnGComponent } from './webinfoMnG/webinfoMnG.component'

import { AuthGuard } from '../core/auth-guard.service'
const routes:Routes=[
    {
        path: '',
        component: ProductComponent,
        children:[
            {
                path: 'prod',
                component: ProdMnGComponent,
                canActivate:[AuthGuard]
            },
            {
                path: 'type',
                component: TypeMnGComponent,
                canActivate:[AuthGuard]
            },
            {
                path: 'news',
                component: NewsMnGComponent,
                canActivate:[AuthGuard]
            },
            {
                path: 'webinfo',
                component: WebInfoMnGComponent,
                canActivate:[AuthGuard]
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