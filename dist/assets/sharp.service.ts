import { Injectable } from '@angular/core';

@Injectable()
export class SharpService {
    private httpHader = "http://"
    private address = "www.phukienthanh.shop:3000/";//10.28.83.150:3000/   192.168.30.105:3000/
    public API={
        loginApi: this.httpHader + this.address+"post/login",
        postApi: this.httpHader + this.address+"get/post",
        regApi: this.httpHader + this.address + "post/reg",
        postImg: this.httpHader + this.address + "post/img",
        getProd: this.httpHader + this.address + "get/product",
        delProd: this.httpHader + this.address + "del/product",
        postType: this.httpHader + this.address + "post/type",
        getType: this.httpHader + this.address + "get/type",
        putType: this.httpHader + this.address + "put/type",
        postNews: this.httpHader + this.address + "post/news",
        getNews: this.httpHader + this.address + "get/news",
        putNews: this.httpHader + this.address + "put/news",
        postWebInfo: this.httpHader + this.address + "post/webInfo",
        getWebInfo: this.httpHader + this.address + "get/webInfo",
        putWebInfo: this.httpHader + this.address + "put/webInfo",
    }
}