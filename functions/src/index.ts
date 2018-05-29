import * as admin from "firebase-admin";
import { database, EventContext, config, Change } from "firebase-functions";

admin.initializeApp(config().firebase);

export const addUserMessages = database
    .ref(`/messages/{messageId}`)
    .onWrite((change: Change<database.DataSnapshot>, context: EventContext) => {

        const messageKey: string = change.after.key;
        const messageValue: { userFromId: string, userToId: string } = change.after.val();

        const updatePromises: Promise<void>[] = [];

        try {
            let fromUpdate: Promise<void> = admin.database().ref(`/user-messages/${messageValue.userFromId}/${messageValue.userToId}`).child(messageKey).set(1);

            let toUpdate: Promise<void> = admin.database().ref(`/user-messages/${messageValue.userToId}/${messageValue.userFromId}`).child(messageKey).set(1);

            updatePromises.push(fromUpdate, toUpdate);
        }
        catch (e) {
            console.log(e);
        }
        return Promise.all(updatePromises);
    }
    );

export const generateLastMessages = database
    .ref(`/messages/{messageId}`)
    .onWrite((change: Change<database.DataSnapshot>, context: EventContext) => {

        const messageKey: string = change.after.key;
        const messageValue: { userFromId: string, userToId: string } = change.after.val();

        const updatePromises: Promise<void>[] = [];

        try {
            let fromUpdate: Promise<void> = admin.database().ref(`/last-messages/${messageValue.userFromId}/${messageValue.userToId}`).child('key').set(messageKey);

            let toUpdate: Promise<void> = admin.database().ref(`/last-messages/${messageValue.userToId}/${messageValue.userFromId}`).child('key').set(messageKey);

            updatePromises.push(fromUpdate, toUpdate);
        }
        catch (e) {
            console.log(e);
        }
        return updatePromises;
    }); 
