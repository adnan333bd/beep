import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoginResponse } from '../../models/login/login-response.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { User } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../data-service/data.service';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  }

  get_Authenticated_User_$(): Observable<User> {
    return this.afAuth.authState;
  }

  async createUser(account: Account) {
    let response;
    try {
      response = <LoginResponse>{
        result: await this.afAuth.auth
          .createUserWithEmailAndPassword(account.email, account.password)
      }
    }
    catch (e) {
      response = <LoginResponse>{
        error: e
      }
    }
    return response;
  }

  async signIn(account: Account) {
    let response: LoginResponse;
    try {
      response = {
        result: await this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)
      };
    }
    catch (e) {
      response = {
        error: e
      };
    }
    return response;
  }

  async signOut() {
    await this.afAuth.auth.signOut();
  }

}
