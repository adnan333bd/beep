import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Message } from '../../models/messages/message.interface';
import { MESSAGE_LIST } from '../../models/mocks/messages';

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  public messageList: Message[] = MESSAGE_LIST;
  constructor() {
  }

}
