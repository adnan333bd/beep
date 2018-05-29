import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { MESSAGE_LIST } from '../../models/mocks/messages';
import { Message } from '../../models/messages/message.interface';
import { AuthService } from '../../providers/auth-service/auth.service';
import { DataService } from '../../providers/data-service/data.service';
import { ChatService } from '../../providers/chat-service/chat.service';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  selectedProfile: Profile;
  messageList: Message[];
  userId: string;
  userProfile: Profile;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    public chatService: ChatService) {
  }

  ionViewWillLoad() {
    this.selectedProfile = this.navParams.get("profile");
    this.dataService.get_Authenticated_Profile_$()
      .subscribe((profile: Profile) => {
        this.userProfile = profile;
        this.userId = profile.$key;
      });

    this.chatService.getChats(this.selectedProfile.$key).subscribe((messages: Message[]) => {
      this.messageList = messages;
      console.log(messages);
    });
  }

  async sendMessage(content: string) {
    try {
      const message: Message = {
        userToId: this.selectedProfile.$key,
        userToProfile: {
          firstName: this.selectedProfile.firstName,
          lastName: this.selectedProfile.lastName,
          avatar: this.selectedProfile.avatar || null
        },
        userFromId: this.userId,
        userFromProfile: {
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName,
          avatar: this.userProfile.avatar || null
        },
        content: content,
        date: Date.now()
      };

      await this.chatService.sendChat(message);

    }
    catch (e) {
      console.log(e);
    }
  }

}
