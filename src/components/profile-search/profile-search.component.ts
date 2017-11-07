import { Component, EventEmitter, Output } from "@angular/core";
import { DataService } from "../../providers/data-service/data.service";
import { Profile } from "../../models/profile/profile.interface";

@Component({
    selector: 'app-profile-search',
    templateUrl: 'profile-search.component.html'
})
export class ProfileSearchComponent {

    query: string = "";
    profileList: Profile[];

    @Output() profileSelectedEmitter: EventEmitter<Profile>;

    constructor(private dataService: DataService) {
        this.profileSelectedEmitter = new EventEmitter<Profile>();
    }

    selectProfile(profile) {
        this.profileSelectedEmitter.emit(profile);
    }

    searchUser() {
        console.log(this.query);
        this.dataService.searchUser(this.query)
            .subscribe((profiles: Profile[]) => {
                this.profileList = profiles;
            },
            error => console.log,
            () => console.log("completed"));
    }
}