import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response.interface';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController, 
    private toastCtrl: ToastController) {
  }

  onLogin(response: LoginResponse) {
    let message : string;
    if (response.error) {
      message = response.error.message;
    }
    else {
      message = `Welcome to Beep, ${response.result.email}`;
      this.navCtrl.setRoot("EditProfilePage");
    }

    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }
}
