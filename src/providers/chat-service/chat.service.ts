import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Channel } from "../../models/channels/channel.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { ChannelMessage } from "../../models/channels/channel-message.interface";


@Injectable()
export class ChatService {

    constructor(private database: AngularFireDatabase) {
    }

    public channelNamesRef$: AngularFireList<Channel> = this.database.list(`channel-names`);

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
        return this.database.list(`channel-names`).snapshotChanges()
            .map(actionArray => {
                return actionArray.map(action => <Channel>({ $key: action.payload.key, ...action.payload.val() }));
            });
    }

    public get_Channel_Messages_$(channelKey: string): Observable<ChannelMessage[]> {
        return this.get_Channels_Ref(channelKey).snapshotChanges()
            .map(actionArray => {
                return actionArray.map(action => <ChannelMessage>({ $key: action.payload.key, ...action.payload.val() }));
            });
    }

    async send_Message_To_Channel(channelKey: string, channelMessage: ChannelMessage): Promise<any> {
        return this.get_Channels_Ref(channelKey)
            .push(channelMessage);
    }

    private get_Channels_Ref(channelKey: string) {
        return this.database.list(`channels/${channelKey}`);
    }

}