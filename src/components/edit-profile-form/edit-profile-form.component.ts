import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { DataService } from '../../providers/data-service/data.service';
import { AuthService } from '../../providers/auth-service/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: 'edit-profile-form.component.html'
})
export class EditProfileFormComponent implements OnDestroy {

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;

  @Output() saveProfileResult: EventEmitter<Boolean>;

  profile: Profile = {} as Profile;

  constructor(private dataService: DataService, private authService: AuthService) {

    this.saveProfileResult = new EventEmitter<boolean>();

    this.authenticatedUser$ = this.authService.getAuthenticatedUser()
      .subscribe((user: User) => {
        this.authenticatedUser = user;
      });
  }

  async saveProfile() {
    if (this.authenticatedUser) {
      this.profile.email = this.authenticatedUser.email;
      const result = await this.dataService.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }

  ngOnDestroy() {
    this.authenticatedUser$.unsubscribe();
  }
}
