import { Component, OnInit } from "@angular/core";
import { DataService } from "../../providers/data-service/data.service";
import { AngularFireList } from "angularfire2/database";
import { Profile } from "../../models/profile/profile.interface";
import { Observable } from "rxjs/Observable";


@Component({
    selector: "app-online-users",
    templateUrl: "online-users.component.html"
})
export class OnlineUsersComponent implements OnInit {

    onlineUsers_$: Observable<Profile[]>;

    constructor(private dataService: DataService) {
    }

    setUserOnline() {
        this.dataService.get_Authenticated_Profile_$()
            .subscribe(profile => {
                this.dataService.set_User_Online(profile);
            });
    }

    ngOnInit() {
        this.setUserOnline();
        this.onlineUsers_$ = this.dataService.get_Online_Users_$();
    }

}