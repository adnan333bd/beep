import { Component, OnDestroy, OnInit, Output, Input, EventEmitter } from '@angular/core';
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

  @Input() profile: Profile;

  constructor(private dataService: DataService, private authService: AuthService) {

    this.saveProfileResult = new EventEmitter<boolean>();

    this.authenticatedUser$ = this.authService.get_Authenticated_User_$()
      .subscribe((user: User) => {
        this.authenticatedUser = user;
      });
  }

  async saveProfile(): Promise<any> {
    if (this.authenticatedUser) {
      this.profile.email = this.authenticatedUser.email;
      console.log(this.profile);
      const result = await this.dataService.save_Profile(this.profile);
      this.saveProfileResult.emit(result);
    }
  }

  public ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

  public ngOnInit(): void {
    if (!this.profile) {
      this.profile = {} as Profile;
    }
  }
}
