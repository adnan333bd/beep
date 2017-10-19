import { Component } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: 'edit-profile-form.component.html'
})
export class EditProfileFormComponent {

  text: string;
  profile: Profile;

  constructor() {    
  }

  SaveProfile() {

  }

}
