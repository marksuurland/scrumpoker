import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.addPokerRoom = functions
    .region('europe-west1')
    .https.onCall(async (data, context) => {
        const name = data.name;
        const newItem = await admin.firestore().collection('/items').add({
            name,
            players: []
        });
        return { id: newItem.id };
    });

exports.resetPokerPoints = functions
    .region('europe-west1')
    .https.onCall(async (data, context) => {
        const id = data.id;
        const pokerGame = await admin.firestore().collection('items').doc(id).get();
        // TODO
        console.log('data', pokerGame.data);
        const result = await admin.firestore().collection('items').doc(id).set({ ...pokerGame.data, players: [] });
        return { isEqual: result.isEqual };
    });
