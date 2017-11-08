import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatService } from '../../providers/chat-service/chat.service';
import { Channel } from '../../models/channels/channel.interface';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {

  channels: Observable<Channel[]>;
  

  constructor(private alertCtrl: AlertController,
    private chatService: ChatService, private navCtrl: NavController,
    private navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.getChannels();
  }

  showAddChannelDialog() {
    this.alertCtrl.create({
      title: 'Channel Name',
      inputs: [{
        name: 'channelName'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Add',
        handler: data => {
          this.chatService.addChannel(data.channelName);
        }
      }]
    }).present();
  }

  getChannels(): void {
    this.channels = this.chatService.getChannels();
  }

  selectChannel(channel: Channel) {
    this.navCtrl.push("ChannelChatPage", { channel });
  }

}
