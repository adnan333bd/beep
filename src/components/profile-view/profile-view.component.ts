import { Component, OnInit } from "@angular/core";
import { DataService } from "../../providers/data-service/data.service";
import { AuthService } from "../../providers/auth-service/auth.service";
import { User } from "firebase/app";
import { Profile } from "../../models/profile/profile.interface";
import { LoadingController, Loading } from "ionic-angular";

@Component({
    selector: 'app-profile-view',
    templateUrl: 'profile-view.component.html'
})
export class ProfileViewComponent implements OnInit {

    userProfile: any = {};
loader: Loading;

    constructor(private dataService: DataService, private authService: AuthService, private loadingCtrl: LoadingController) { 
        this.loader = this.loadingCtrl.create({
            content: 'Loading profile ...'
        });
    }

    ngOnInit(): void {
        this.loader.present();
        this.authService.getAuthenticatedUser().subscribe((user: User) => {
            this.dataService.getProfile(user).subscribe((profile: Profile) => {
                this.userProfile = profile;
                this.loader.dismiss();
            });
        });
    }

    onDateChange(event): void {
        console.log(this.userProfile);
    }
}