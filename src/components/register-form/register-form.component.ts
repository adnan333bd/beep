import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth.service';
import { LoginResponse } from '../../models/login/login-response.interface';

@Component({
  selector: 'register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {

  account = {} as Account;
  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private authService: AuthService) {
      this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register() {
    let loginResponse: LoginResponse
      = await this.authService.createUser(this.account);
    this.registerStatus.emit(loginResponse);
  }

}
