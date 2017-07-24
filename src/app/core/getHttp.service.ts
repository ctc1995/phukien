import { Injectable }  from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs/observable';
import { SharpService } from '../../assets/sharp.service'

@Injectable()

export class GetHttp{
    constructor(
        private sharpService: SharpService,
        private http: Http
    ){}
    public upImage(formData){
        let api = this.sharpService.API.postImg;
        return this.http.post(api, formData).map(
            files => {
                files.json()
            }
        )
    }
    public getProd(query){
        let api = this.sharpService.API.getProd 
        if(query){
            api += "?name=" + query
        }
        return this.http.get(api).map(
            res=>{
                return res.json()||{}
            }
        )
    }
    public getData(query, api){
        if(query){
            api += "?name=" + query
        }
        return this.http.get(api).map(
            res=>{
                return res.json()||{}
            }
        )
    }
    public postData(data, api){
        let headers = new Headers({
            "Content-Type": "application/json"
        })
        return this.http.post(api, data, {headers:headers}).map(
            res=>{
                return res
            }
        )
    }
    public putData(data, api){
        let headers = new Headers({
            "Content-Type": "application/json"
        })
        return this.http.put(api, data, {headers:headers}).map(
            res=>{
                return res.json() || {}
            }
        )
    }
}