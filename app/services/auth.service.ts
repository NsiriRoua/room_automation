import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Storage } from '@ionic/storage-angular';
import * as hmacsha256 from 'crypto-js/hmac-sha256';
import * as Base64 from 'crypto-js/enc-base64';
import { AuthConstants } from '../config/config/auth-constants'
@Injectable({
providedIn: 'root'
})
export class AuthService {
constructor(
private httpService: HttpService,
private storage: Storage,
private router: Router
) {}
private base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

private strRandom(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
clientid = this.strRandom(40);
codeVerifier = this.strRandom(128);
codeChallenge = this.base64URLEncode((hmacsha256(this.codeVerifier, this.sha256Secret));


login(postData: any): Observable<any> {
return this.httpService.post('api/login', postData);
}

signup(postData: any): Observable<any> {
return this.httpService.post('api/register', postData);
}

preSignIn(clientId : any, codeChallenge : any): Observable<any> {
    let data = {
        clientId: clientId,
        codeChallenge: codeChallenge
    };
    return this.httpService.post('api/authorize', data);
    }
    
postSignIn(authorizationCode : any, codeVerifier : any, username : any): Observable<any> {
    let data = {
        authorizationCode: authorizationCode,
        codeVerifier: codeVerifier,
        username : username
    };
    return this.httpService.post('api/oauth/token', data);
    }
logout() {
this.storage.clear().then(res => {
this.router.navigate(['/']);
});
}

  }
