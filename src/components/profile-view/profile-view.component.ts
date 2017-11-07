import { Component, OnInit, Output, EventEmitter } from "@angular/core";
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

    public userProfile: any = {};
    private loader: Loading;

    @Output() profileEmitter: EventEmitter<Profile>;

    constructor(private dataService: DataService, private authService: AuthService, private loadingCtrl: LoadingController) {

        this.profileEmitter = new EventEmitter<Profile>();

        this.loader = this.loadingCtrl.create({
            content: 'Loading profile ...'
        });
    }

    ngOnInit(): void {
        this.loader.present();

        this.dataService.getAuthenticatedUserProfile()
            .subscribe((profile: Profile) => {
                this.userProfile = profile;
                this.profileEmitter.emit(profile);
                this.loader.dismiss();
            });

    }

    onDateChange(event): void {
        console.log(this.userProfile);
    }
}