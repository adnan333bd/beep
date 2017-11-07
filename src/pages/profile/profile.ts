import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { AuthService } from '../../providers/auth-service/auth.service';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;

  constructor(private navCtrl: NavController, private navParams: NavParams, private authService: AuthService) {
  }

  navigateToEditProfilePage() {
    this.navCtrl.push("EditProfilePage", { profile: this.profile })
  }

  getProfile(profile: Profile) {
    this.profile = profile;
  }

  async logout() {
    await this.authService.signOut();
    this.navCtrl.setRoot("LoginPage");
  }

}
