import { Injectable }  from '@angular/core'
import { Http } from '@angular/http'
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
}