import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import "rxjs/add/operator/take";
import "rxjs/add/operator/mergeMap";
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class DataService {

  constructor(private authService: AuthService, private database: AngularFireDatabase) {
  }

  getAuthenticatedUserProfile(): Observable<Profile> {
    return this.authService.getAuthenticatedUser()
      .mergeMap(user => this.getProfile(user));
  }

  searchUser(firstName: string): Observable<Profile[]> {
    const query = this.database.list("/profiles", ref => ref.orderByChild('firstName').equalTo(firstName));
    return query.valueChanges().map((profileObject: any[]) => profileObject.map(p => <Profile>p)).take(1);
  }

  getProfile(user: User): Observable<Profile> {
    return this.database.object(`/profiles/${user.uid}`)
      .valueChanges()
      .take(1)
      .map(
      (profileObject: any) => {
        let profile = <Profile>profileObject;
        return profile;
      }
      );
  }

  async saveProfile(user: User, profile: Profile): Promise<boolean> {
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


