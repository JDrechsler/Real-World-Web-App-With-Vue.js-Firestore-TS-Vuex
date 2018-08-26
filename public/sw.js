self.addEventListener('install', (/** @type {ExtendableEvent} */ event) => {
  console.log('SW: Install Event');
});

self.addEventListener('activate', async () => {
  console.log('SW: Activate Event');

  setInterval(checkBillsToday(), 1000 * 60);
});

async function checkBillsToday() {
  const docsRes = await fetch(
    'https://firestore.googleapis.com/v1beta1/projects/billersapp/databases/(default)/documents/billers?key=AIzaSyCJXGDc2kvyJSOSzu_hvhS64sHDnyKn_qE'
  );
  const docsData = await docsRes.json();

  const bills = docsData.documents.map(data => data.fields);
  const billsTodayUnpaid = bills
    .filter(
      bills => bills.dayOfMonth.integerValue === new Date().getDate().toString()
    )
    .filter(billToday => billToday.isPaid.booleanValue === false);

  billsTodayUnpaid.forEach(billTodayUnpaid => {
    console.log(billTodayUnpaid);
    self.registration.showNotification(
      `${billTodayUnpaid.title.stringValue} due today!`,
      {
        body: billTodayUnpaid.amount.integerValue
      }
    );
  });
}
