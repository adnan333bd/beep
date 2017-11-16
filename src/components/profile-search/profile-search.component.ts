import { Component, EventEmitter, Output } from "@angular/core";
import { DataService } from "../../providers/data-service/data.service";
import { Profile } from "../../models/profile/profile.interface";

@Component({
    selector: 'app-profile-search',
    templateUrl: 'profile-search.component.html'
})
export class ProfileSearchComponent {

    public query: string = "";
    public profileList: Profile[];

    @Output() profileSelectedEmitter: EventEmitter<Profile>;

    constructor(private dataService: DataService) {
        this.profileSelectedEmitter = new EventEmitter<Profile>();
    }

    public selectProfile(profile): void {

        this.profileSelectedEmitter.emit(profile);
    }

    public searchUser(): void {
        
        this.dataService.search_Profiles_$(this.query)
            .subscribe((profiles: Profile[]) => {
                this.profileList = profiles;
            },
            error => console.log);
    }
}