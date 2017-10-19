import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response.interface';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register-page.html',
})
export class RegisterPage {

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private toastCtrl: ToastController) {
  }

  onRegister(loginResponse: LoginResponse) {
    let message;
    if (loginResponse.result)
      message = `Thanks for registering ${loginResponse.result.email}`;
    else
      message = `Account not created as ${loginResponse.error.message.toLowerCase()}`;

    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
