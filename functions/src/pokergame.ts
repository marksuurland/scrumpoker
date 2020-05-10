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
        return { id: newItem.id};
    });
