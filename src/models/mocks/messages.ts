import { Message } from "../messages/message.interface";
import { PROFILE_LIST } from "./profiles";

const message_list: Message[] = new Array<Message>();
PROFILE_LIST.forEach(profile => {
    message_list.push({ profile: profile, date: new Date(), lastMessage: "Hi man!" });
    message_list.push({ profile: profile, date: new Date(), lastMessage: "Hi man!" });
});

export const MESSAGE_LIST = message_list;