import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';
import { AuthService } from '../../providers/auth-service/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {

  account = {} as Account;
  @Output() loginStatus: EventEmitter<LoginResponse>;
  @Output() navToPageEmitter: EventEmitter<string>; 

  constructor(private navCtrl: NavController, private authService: AuthService) {
    this.loginStatus = new EventEmitter<any>();
    this.navToPageEmitter = new EventEmitter<string>();
  }

  navigateToRegisterPage() {
    this.navToPageEmitter.emit("RegisterPage");
  }

  async login() {
    const response: LoginResponse = await this.authService.signIn(this.account);
    this.loginStatus.emit(response);
  }

}
