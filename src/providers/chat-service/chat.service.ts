import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Channel } from "../../models/channels/channel.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";


@Injectable()
export class ChatService {

    constructor(private database: AngularFireDatabase) {

    }

    async addChannel(channelName: string) {
        await this.database.list(`channel-names`).push({ name: channelName });
    }

    getChannels(): Observable<Channel[]> {
        return this.database.list(`channel-names`).snapshotChanges()
            .map(actionArray => {
                return actionArray.map(action => <Channel>({ $key: action.payload.key, ...action.payload.val() }));
            })
            .do(console.log);
    }

}