import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-send-message-box',
  templateUrl: 'send-message-box.component.html'
})
export class SendMessageBoxComponent {

  message: string;
  @Output() messageEmitter: EventEmitter<string>;

  constructor() {
    this.messageEmitter = new EventEmitter<string>();
  }

  sendMessage(message: string) {
    this.messageEmitter.emit(message);
    this.message = "";
  }

}
