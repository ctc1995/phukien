import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { SharpService } from '../../assets/sharp.service'

@Injectable()

export class LoginService{
    constructor(
        private http: Http,
        private sharpService: SharpService
    ) { }
    public loginPost(user:string, psd: string): Promise<void>{
        let api = this.sharpService.API.loginApi;
        let data = {
            name: user,
            psd: psd
        }
        console.log(api);
        return this.http.post(api, data)
                        .toPromise()
                        .then(res=>{
                            console.log(res);
                            console.log(res['_body']);
                            sessionStorage.setItem('token',res['_body'])
                            return res['_body'];
                        })
                        .catch(this.handleError);
    }
    // public regPost(user: string, psd: string, email: string): Promise<void>{
    //     let api = this.sharpService.API.regApi
    //     let data = {
    //         name: user,
    //         psd: psd,
    //         psd_repeat: psd,
    //         email: email
    //     }
    //     return this.http.post(api, data)
    //                     .toPromise()
    //                     .then(
    //                         res=>{
    //                             res.json() || {}
    //                         }
    //                     )
    //                     .catch(this.handleError)
    // }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}