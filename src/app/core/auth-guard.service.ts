//路由守卫，通过条件来判断是否进入下一个路由
import { Injectable } from '@angular/core'
import {
	CanActivate,
	CanLoad,
	Router,
	Route,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router'


@Injectable()
export class AuthGuard implements CanActivate,CanLoad {
	constructor(
		private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
		let url: string = state.url
		console.log(url);
		return this.checkLogin(url)
	}
	canLoad(route:Route): boolean{
		let url=`/${route.path}`
		console.log(route);
		return this.checkLogin(url)
	}
	checkLogin(url:string): boolean{
		return true
		// if(JSON.parse(sessionStorage.getItem('token'))!==null){
		// 	console.log(1);
		// 	return true
		// }else{
		// 	console.log(false)
		// }
		//this.router.navigate(['/login'])
	}
}
