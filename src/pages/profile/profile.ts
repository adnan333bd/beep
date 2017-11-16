import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { AuthService } from '../../providers/auth-service/auth.service';
import { DataService } from '../../providers/data-service/data.service';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;

  constructor(private navCtrl: NavController, private navParams: NavParams, private authService: AuthService, private app: App, private dataService: DataService) {
  }

  navigateToEditProfilePage() {
    this.navCtrl.push("EditProfilePage", { profile: this.profile })
  }

  getProfile(profile: Profile) {
    this.profile = profile;
  }

  async logout() {
    await this.dataService.set_User_Offline();
    await this.authService.signOut();    
    this.app.getRootNav().setRoot("LoginPage");
  }

}
