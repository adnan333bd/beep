import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Channel } from '../../models/channels/channel.interface';
import { ChatService } from '../../providers/chat-service/chat.service';
import { Observable } from 'rxjs/Observable';
import { ChannelMessage } from '../../models/channels/channel-message.interface';
import { ToastService } from '../../providers/toast-service/toast-service';

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channel: Channel;
  channelMessages_Stream: Observable<ChannelMessage[]>;

  constructor(private chatService: ChatService,
    private navCtrl: NavController,
    private navParams: NavParams, private toastService: ToastService) {
  }

  async sendMessageToChannel(message: string) {    
     await this.chatService.send_Message_To_Channel(this.channel.$key, { content: message });    
  }

  ionViewWillLoad() {
    this.channel = <Channel>this.navParams.get("channel");
    this.channelMessages_Stream = this.chatService.get_Channel_Messages_$(this.channel.$key);
  }

}
