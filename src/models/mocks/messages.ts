import { Message } from "../messages/message.interface";
import { USER_LIST } from "./users";

const message_list: Message[] = new Array<Message>();
USER_LIST.forEach(user => {
    message_list.push({ user: user, date: new Date(), lastMessage: "Hi man!" });
});

export const MESSAGE_LIST = message_list;