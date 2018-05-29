import { Component, OnInit } from "@angular/core";
import { ChatService } from "../../providers/chat-service/chat.service";
import { Message } from "../../models/messages/message.interface";
import { Profile } from "../../models/profile/profile.interface";
import { NavController } from "ionic-angular";
import { DataService } from "../../providers/data-service/data.service";
import { AuthService } from "../../providers/auth-service/auth.service";
import { User } from "firebase/app";


@Component({
    selector: 'app-last-message-list',
    templateUrl: 'last-message-list.component.html'
})
export class LastMessageListComponent implements OnInit {
    lastMessages: Message[];
    userId: string;
    constructor(private navCtrl: NavController,
        private chatService: ChatService,
        private dataService: DataService,
        private authService: AuthService) { }

    ngOnInit() {
        this.chatService.getLastMessages()
            .subscribe((lastMessages: Message[]) => {
                this.lastMessages = lastMessages;
                console.log(lastMessages);
            });
        this.authService.get_Authenticated_User_$().subscribe((user: User) => {
            this.userId = user.uid;
            console.log(this.userId);
        });
    }

    openChat(userId: string) {
        this.dataService.get_Profile_ById_$(userId).subscribe((profile: Profile) => {
            this.navCtrl.push("MessagePage", { profile });
        });
    }
}