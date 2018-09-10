"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });
exports.tsTest = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});
exports.checkBills = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    const querySnapshot = yield admin
        .firestore()
        .collection('billers')
        .get();
    const bills = querySnapshot.docs
        .map(doc => {
        const data = doc.data();
        return {
            id: data.id,
            isPaid: data.isPaid,
            autoPay: data.autoPay,
            dayOfMonth: data.dayOfMonth,
            imageUrl: data.imageUrl,
            title: data.title,
            amount: data.amount
        };
    })
        .filter(bill => !bill.isPaid)
        .filter(bill => bill.dayOfMonth <= new Date().getDate());
    if (bills.length > 0) {
        console.log(bills);
        const deviceIdsQuerySnapshot = yield admin
            .firestore()
            .collection('devices')
            .get();
        const deviceTokens = deviceIdsQuerySnapshot.docs.map(doc => doc.data().token);
        const uniqueDeviceTokens = [...new Set(deviceTokens)];
        console.log(uniqueDeviceTokens);
        bills.forEach(bill => {
            let dueMessage = 'due today!';
            if (bill.dayOfMonth < new Date().getDate()) {
                if (new Date().getDate() - bill.dayOfMonth === 1) {
                    dueMessage = 'was due yesterday!!';
                }
                else {
                    dueMessage = `was due ${new Date().getDate() -
                        bill.dayOfMonth} days ago!!!`;
                }
            }
            uniqueDeviceTokens.forEach((token) => __awaiter(this, void 0, void 0, function* () {
                const message = {
                    token: token,
                    webpush: {
                        notification: {
                            icon: 'https://billersapp.firebaseapp.com/img/icons/icon.ico',
                            badge: 'https://billersapp.firebaseapp.com/img/icons/icon.ico',
                            title: `${bill.title} ${dueMessage}`,
                            image: bill.imageUrl
                        }
                    }
                };
                try {
                    const responseID = yield admin.messaging().send(message);
                    console.log('Message sent', responseID);
                }
                catch (error) {
                    //TODO remove not working tokens
                    console.log(error);
                }
            }));
        });
    }
    else {
        console.log('No bills due today');
    }
    response.send('Messages sent');
}));
//# sourceMappingURL=index.js.map