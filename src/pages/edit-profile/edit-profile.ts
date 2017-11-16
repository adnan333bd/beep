import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { ToastService } from '../../providers/toast-service/toast-service';
import { DataService } from '../../providers/data-service/data.service';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  profile: Profile;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastService: ToastService,
    public dataService: DataService) {
    this.profile = navParams.get("profile");
    console.log('edit profile cons');
  }

  onSaveProfile(success: boolean) {
    let message;
    if (success)
      message = "Profile saved successfully.";
    else
      message = "Could not save profile."

    this.toastService.showMessage(message);

    success ? this.navCtrl.setRoot("ProfilePage") : console.log("Not authenticated");
  }

  ionViewWillLoad() {
    if (!this.profile) {
      this.dataService.get_Authenticated_Profile_$()
        .subscribe(profile => {
          console.log('edit profile - ionViewWillLoad');
          this.profile = profile;
          console.log(profile);
        });
    }
  }

}
