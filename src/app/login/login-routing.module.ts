//登陆模块路由模块文件
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login.component'

const routes:Routes=[
    {
        path: '',
        component: LoginComponent
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
export class LoginRoutingModule{}