import { Component } from "@angular/core";
import { IonicPage, NavController, ToastController, App } from "ionic-angular";
import { LoginResponse } from "../../models/login/login-response.interface";
import { DataService } from "../../providers/data-service/data.service";
import { User } from "firebase/app";
import { ToastService } from "../../providers/toast-service/toast-service";
import { Profile } from "../../models/profile/profile.interface";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login-page.html"
})
export class LoginPage {
  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
    private toastService: ToastService
  ) {}

  public onLogin(response: LoginResponse) {
    let message: string;
    if (response.error) {
      message = response.error.message;
    } else {
      message = `Welcome to Beep, ${response.result.email}`;

      this.dataService
        .get_Profile_$(<User>response.result)
        .subscribe((profile: Profile) => {
          if (profile.email) {
            this.navCtrl.setRoot("TabsPage");
          } else {
            this.navCtrl.setRoot("EditProfilePage");
          }
        });
    }

    this.toastService.showMessage(message);
  }

  navigateToPage(pageName: string) {
    this.navCtrl.push(pageName);
  }
}
