import { Component, OnInit } from "@angular/core";
import { DataService } from "../../providers/data-service/data.service";
import { AuthService } from "../../providers/auth-service/auth.service";
import { User } from "firebase/app";
import { Profile } from "../../models/profile/profile.interface";

@Component({
    selector: 'app-profile-view',
    templateUrl: 'profile-view.component.html'
})
export class ProfileViewComponent implements OnInit {

    userProfile: Profile;

    constructor(private dataService: DataService, private authService: AuthService) 
    {  }

    ngOnInit(): void {
        this.authService.getAuthenticatedUser().subscribe((user: User) => {
            this.dataService.getProfile(user).subscribe((profile: Profile)=>{
                this.userProfile = profile;
            });
        });        
    }
}