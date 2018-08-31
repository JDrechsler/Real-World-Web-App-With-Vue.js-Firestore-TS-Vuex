import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const regTokens = [
  'coVLlHGoMmI:APA91bGbnS8KZLRCaTwd9vNMJjdgsKpWB2-zFVN79KHGfn8DBLomvOKegCFc1eAeZpetQkg6WU45heVef5HSJbn-vaTtQTT0Hl0fGWH8NhfY1uKAl2Q_w7xKXFXD7bzLx15rgHh8CoSE'
];

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
      .filter(bill => bill.dayOfMonth === new Date().getDate());

    if (bills.length > 0) {
      console.log(bills);

      bills.forEach(bill => {
        regTokens.forEach(async regToken => {
          const message: admin.messaging.Message = {
            token: regToken,
            data: {
              title: bill.title,
              imageUrl: bill.imageUrl
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
