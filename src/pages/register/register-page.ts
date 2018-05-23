import { Component } from "@angular/core";
import { IonicPage, ToastController, NavController } from "ionic-angular";
import { LoginResponse } from "../../models/login/login-response.interface";
import { ToastService } from "../../providers/toast-service/toast-service";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register-page.html"
})
export class RegisterPage {
  constructor(
    private toastService: ToastService,
    private navCtrl: NavController
  ) {}

  onRegister(loginResponse: LoginResponse) {
    let message;
    if (loginResponse.result) {
      message = `Thanks for registering ${loginResponse.result.email}`;
      this.navCtrl.setRoot("EditProfilePage");
    } else
      message = `Account not created as ${loginResponse.error.message.toLowerCase()}`;

    this.toastService.showMessage(message);
  }
}
