import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import "rxjs/add/operator/take";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {  

  constructor(private database: AngularFireDatabase) {
  }

  getProfile(user: User) {
    let profileObject = this.database.object<Profile>(`/profiles/${user.uid}`).valueChanges().take(1);
    return profileObject;
  }


  async saveProfile(user: User, profile: Profile) {
    let profileObject = this.database.object(`/profiles/${user.uid}`);

    try {
      await profileObject.set(profile);
      return true;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }


}
