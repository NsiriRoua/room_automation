import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants }from './../../config/config/auth-constants';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';

@Component({
selector: 'app-signin',
templateUrl: './signin.page.html',
styleUrls: ['./signin.page.scss']
})
export class SigninPage implements OnInit {
postData = {
username: '',
password: ''
};

constructor(
private router: Router,
private authService: AuthService,
private storageService: StorageService,
private toastService: ToastService
) {}

ngOnInit() {}

validateInputs() {
console.log(this.postData);
let username = this.postData.username.trim();
let password = this.postData.password.trim();
return (
this.postData.username &&
this.postData.password &&
username.length > 0 &&
password.length > 0
);
}

loginAction() {
if (this.validateInputs()) {
this.authService.login(this.postData).subscribe(
(res: any) => {
if (res.userData) {
// Storing the User data.
this.storageService.store(AuthConstants.AUTH, res.userData);
this.router.navigate(['home/feed']);
} else {
this.toastService.presentToast('Incorrect username and password.');
}
},
(error: any) => {
this.toastService.presentToast('Network Issue.');
}
);
} else {
this.toastService.presentToast(
'Please enter username or password.'
);
}
}
}