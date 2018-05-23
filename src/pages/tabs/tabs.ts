import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  inboxTabRoot: string;
  channelsTabRoot: string;
  profileTabRoot: string;

  constructor() {
    this.inboxTabRoot = "InboxPage";
    this.channelsTabRoot = "ChannelsPage";
    this.profileTabRoot = "ProfilePage";
  }
}
