import { Component, OnInit } from "@angular/core";
import { DataService } from "../../providers/data-service/data.service";
import { AngularFireList } from "angularfire2/database";
import { Profile } from "../../models/profile/profile.interface";
import { Observable } from "rxjs/Observable";
import { NavController } from "ionic-angular";

@Component({
  selector: "app-online-users",
  templateUrl: "online-users.component.html"
})
export class OnlineUsersComponent implements OnInit {
  onlineUsers: Profile[];
  constructor(
    private dataService: DataService,
    private navCtrl: NavController
  ) {}

  setUserOnline() {
    this.dataService.get_Authenticated_Profile_$().subscribe(profile => {
      this.dataService.set_User_Online(profile);
    });
  }

  ngOnInit() {
    this.setUserOnline();
    this.dataService.get_Online_Users_$().subscribe(
      users => {
          console.log(users);
        this.onlineUsers = users;
      },
      e => console.log(e)
    );
  }

  openChat(profile: Profile) {
    this.navCtrl.push("MessagePage", { profile });
  }
}
