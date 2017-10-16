import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  inboxTab: string;
  channelsTab: string;
  profileTab: string;

  constructor() {
    this.inboxTab = "InboxPage";
    this.channelsTab = "ChannelsPage";
    this.profileTab = "ProfilePage";
  }

}
