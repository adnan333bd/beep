import { Component, Input } from '@angular/core';
import { Message } from '../../models/messages/message.interface';


@Component({
  selector: 'app-chat-message',
  templateUrl: 'chat-message.component.html'
})
export class ChatMessageComponent {

  @Input() message: Message;
  @Input() userId: string;

  constructor() {    
  }

}
