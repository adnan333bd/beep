import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response.interface';
import { DataService } from '../../providers/data-service/data.service';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController, 
    private toastCtrl: ToastController, private dataService: DataService) {
  }

  onLogin(response: LoginResponse) {
    let message : string;
    if (response.error) {
      message = response.error.message;
    }
    else {
      message = `Welcome to Beep, ${response.result.email}`;

      this.dataService.getProfile(<User>response.result).subscribe(profile => {
        profile ? this.navCtrl.setRoot("TabsPage") : this.navCtrl.setRoot("EditProfilePage");
      });
    }

    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }
}
