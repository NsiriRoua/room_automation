import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from './../../config/config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage-angular'
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
  })
  export class SignupPage implements OnInit {
  postData = {
  username: '',
  email: '',
  password: ''
  };
  
  constructor(
  private authService: AuthService,
  private toastService: ToastService,
  private storage: Storage,
  private router: Router
  ) {
    this.storage.create();
  }
  
  ngOnInit() {}
  
  validateInputs() {
  console.log(this.postData);
  let username = this.postData.username.trim();
  let password = this.postData.password.trim();
  let email = this.postData.email.trim();
  return (
  this.postData.username &&
  this.postData.password &&
  this.postData.email &&
  username.length > 0 &&
  email.length > 0 &&
  password.length > 0
  );
  }
  public set(key: string, value: any) {
    this.storage?.set(key, value);
  }

  public get(key: string) {
    return this.storage?.get(key);
  }
  
  signAction() {
  if (this.validateInputs()) {
  this.authService.signup(this.postData).subscribe(
  (res: any) => {
  if (res.userData) {
  // Storing the User data.
  this.storage
  .set(AuthConstants.AUTH, res.userData)
  .then(res => {
  this.router.navigate(['home/feed']);
  });
  } else {
  this.toastService.presentToast(
  'Data alreay exists, please enter new details.'
  );
  }
  },
  (error: any) => {
  this.toastService.presentToast('Network Issue.');
  }
  );
  } else {
  this.toastService.presentToast(
  'Please enter email, username or password.'
  );
  }
  }
  }