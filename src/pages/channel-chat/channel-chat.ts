import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Channel } from '../../models/channels/channel.interface';
import { ChatService } from '../../providers/chat-service/chat.service';

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channel: Channel;
  constructor(private chatService: ChatService,
    private navCtrl: NavController, 
    private navParams: NavParams) {
    
  }

  ionViewWillLoad() {    
    this.channel = <Channel>this.navParams.get("channel");    
  }

}
