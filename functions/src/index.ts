import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

export const tsTest = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

export const checkBills = functions.https.onRequest(
  async (request, response) => {
    const querySnapshot = await admin
      .firestore()
      .collection('billers')
      .get();

    const bills: Bill[] = querySnapshot.docs
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

      const deviceIdsQuerySnapshot = await admin
        .firestore()
        .collection('devices')
        .get();

      const deviceTokens = deviceIdsQuerySnapshot.docs.map(
        doc => doc.data().token
      );

      const uniqueDeviceTokens = [...new Set(deviceTokens)];
      console.log(uniqueDeviceTokens);

      bills.forEach(bill => {
        let dueMessage = 'due today!';

        if (bill.dayOfMonth < new Date().getDate()) {
          if (new Date().getDate() - bill.dayOfMonth === 1) {
            dueMessage = 'was due yesterday!!';
          } else {
            dueMessage = `was due ${new Date().getDate() -
              bill.dayOfMonth} days ago!!!`;
          }
        }

        uniqueDeviceTokens.forEach(async token => {
          const message: admin.messaging.Message = {
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
            const responseID = await admin.messaging().send(message);
            console.log('Message sent', responseID);
          } catch (error) {
            console.log(error);
          }
        });
      });
    } else {
      console.log('No bills due today');
    }

    response.send('Messages sent');
  }
);
