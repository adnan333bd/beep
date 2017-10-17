import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {

  account = {} as Account;
  constructor(private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController) {

  }

  navigateToPage(pageName: string) {
    pageName === 'TabsPage' ? this.navCtrl.setRoot(pageName) : this.navCtrl.push(pageName);
  }

  async login() {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.account.email, this.account.password);

      console.log(result);

      this.toastCtrl.create({
        message: "Logged in successfully.",
        duration: 3000
      }).present();

      this.navigateToPage('TabsPage');
    }
    catch (e) {
      console.log(e);
      this.toastCtrl.create({
        message: e.message,
        duration: 3000
      }).present();
    }
  }

}
