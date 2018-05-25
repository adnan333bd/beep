import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { User } from "firebase/app";
import { Profile } from "../../models/profile/profile.interface";
import "rxjs/add/operator/take";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../auth-service/auth.service";

@Injectable()
export class DataService {
  constructor(
    private authService: AuthService,
    private database: AngularFireDatabase
  ) {}

  public get_Authenticated_Profile_$(): Observable<Profile> {
    return this.authService
      .get_Authenticated_User_$()
      .mergeMap((user: User) => this.get_Profile_$(user))
      .take(1);
  }

  public search_Profiles_$(firstName: string): Observable<Profile[]> {
    const query = this.database.list("/profiles", ref =>
      ref.orderByChild("firstName").equalTo(firstName)
    );
    return query
      .valueChanges()
      .map((profileObject: any[]) => profileObject.map(p => <Profile>p))
      .take(1);
  }

  public get_Profile_$(user: User): Observable<Profile> {
    return this.database
      .object(`/profiles/${user.uid}`)
      .snapshotChanges()
      .map(action => {
        return <Profile>{
          $key: action.payload.key,
          ...action.payload.val()
        }; /*incase does not exist, new profile object with key set to user.uid is returned*/
      })
      .take(1);
  }

  public async save_Profile(profile: Profile): Promise<boolean> {
    let profileObject = this.database.object(
      `/profiles/${profile.$key}`
    ); /*https://github.com/angular/angularfire2/blob/master/docs/rtdb/objects.md*/

    try {
      delete profile.$key;
      await profileObject.set(profile);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async set_User_Online(profile: Profile): Promise<void> {
    let onlineUserRef = this.database.object(`/online-users/${profile.$key}`)
      .query.ref;
    try {
      delete profile.$key;
      await onlineUserRef.set({ ...profile });
      await onlineUserRef.onDisconnect().remove();
    } catch (e) {
      console.log(e);
    }
  }

  public set_User_Offline(): Promise<any> {
    return this.get_Authenticated_Profile_$()
      .flatMap(profile => {
        let onlineUserRef = this.database.object(
          `/online-users/${profile.$key}`
        ).query.ref;
        try {
          //delete profile.$key;
          return onlineUserRef.remove();
        } catch (e) {
          console.log(e);
        }
      })
      .toPromise();
  }

  get_Online_Users_$(): Observable<Profile[]> {
    return this.database
      .list(`online-users`)
      .snapshotChanges()
      .map(actions => {
        return actions.map(
          action =>
            <Profile>{
              $key: action.payload.key,
              ...action.payload.val()
            }
        );
      });
  }
}
