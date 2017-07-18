import { Injectable } from '@angular/core';

@Injectable()
export class SharpService {
    private httpHader = "http://"
    private address = "192.168.30.104:3000/";//10.28.83.150:3000/
    public API={
        loginApi: this.httpHader + this.address+"post/login",
        postApi: this.httpHader + this.address+"get/post",
        regApi: this.httpHader + this.address + "post/reg",
        postImg: this.httpHader + this.address + "post/img",
        getProd: this.httpHader + this.address + "get/product",
        postType: this.httpHader + this.address + "post/type",
        getType: this.httpHader + this.address + "get/type",
        putType: this.httpHader + this.address + "put/type",
    }
}