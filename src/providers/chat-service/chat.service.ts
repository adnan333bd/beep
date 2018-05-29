import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Channel } from "../../models/channels/channel.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/observable/forkJoin";
import { ChannelMessage } from "../../models/channels/channel-message.interface";
import { Message } from "../../models/messages/message.interface";
import { AuthService } from "../auth-service/auth.service";

@Injectable()
export class ChatService {
  constructor(private database: AngularFireDatabase, private authService: AuthService) { }

  public channelNamesRef$: AngularFireList<Channel> = this.database.list(
    `channel-names`
  );

  async addChannel(channelName: string) {
    return this.channelNamesRef$.push({ name: channelName });
  }

  async updateChannel(key: string, channel: Channel) {
    return this.channelNamesRef$.update(key, channel);
  }

  async removeChannel(key: string) {
    return this.channelNamesRef$.remove(key);
  }

  public getChannels_$(): Observable<Channel[]> {
    return this.database
      .list(`channel-names`)
      .snapshotChanges()
      .map(actionArray => {
        return actionArray.map(
          action =>
            <Channel>{ $key: action.payload.key, ...action.payload.val() }
        );
      });
  }

  public get_Channel_Messages_$(
    channelKey: string
  ): Observable<ChannelMessage[]> {
    return this.get_Channels_Ref(channelKey)
      .snapshotChanges()
      .map(actionArray => {
        return actionArray.map(
          action =>
            <ChannelMessage>{
              $key: action.payload.key,
              ...action.payload.val()
            }
        );
      });
  }

  async send_Message_To_Channel(
    channelKey: string,
    channelMessage: ChannelMessage
  ): Promise<any> {
    await this.get_Channels_Ref(channelKey).push(channelMessage);
  }

  private get_Channels_Ref(channelKey: string) {
    return this.database.list(`channels/${channelKey}`);
  }

  async sendChat(message: Message) {
    await this.database.list('/messages').push(message);
  }

  private getOneToOneMessages(pathToAllMessages: AngularFireList<{ $key: string }>): Observable<{ $key: string }[]> {
    return pathToAllMessages.snapshotChanges()
      .map(actionArray => {
        return actionArray.map(
          action =>
            <{ $key: string }>{
              $key: action.payload.key
            }
        );
      });
  }

  getChats(userTwoId: string): Observable<Message[]> {
    return this.authService.get_Authenticated_User_$()
      .map(user => user.uid)
      .mergeMap(uid => this.getOneToOneMessages(this.database.list(`/user-messages/${uid}/${userTwoId}`)))
      .mergeMap(chats => {
        return Observable.forkJoin(chats.map(chat => this.database.object(`/messages/${chat.$key}`).valueChanges().take(1).map(msObj => <Message>msObj)))
      });
  }

  getLastMessages(): Observable<Message[]> {
    return this.authService.get_Authenticated_User_$()
    .map(user => user.uid)
    .mergeMap(uid => this.database.list(`/last-messages/${uid}`).valueChanges())
    .mergeMap((messageIds: {key: string}[]) => {
      return Observable.forkJoin(
        messageIds.map((messageId: {key: string}) => {
          return this.database.object(`/messages/${messageId.key}`).valueChanges().take(1).map(ob => <Message>ob);
        })
      );
    })
  }  


}
