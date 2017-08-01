import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './core/auth-guard.service'

const routes:Routes=[
    {
        path:'login',
        loadChildren:'./login/login.module#LoginModule',
	},
    {
        path: 'product',
        loadChildren:'./product/product.module#ProductModule',
    },
    {
        path: '',
        redirectTo: 'product',
        pathMatch:'full'
    },
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{}