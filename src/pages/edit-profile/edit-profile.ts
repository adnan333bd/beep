import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController) {
  }

  onSaveProfile(event: boolean) {
    let message;
    if (event)
      message = "Profile saved successfully.";
    else
      message = "Could not save profile."

    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();


    event ? this.navCtrl.setRoot("TabsPage") : console.log("Not authenticated");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}
