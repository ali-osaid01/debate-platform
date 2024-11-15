importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAW_qOt-80N70-Esj1cd8GocVaRIlRl1KU",
    authDomain: "virtual-debate-3ad36.firebaseapp.com",
    projectId: "virtual-debate-3ad36",
    storageBucket: "virtual-debate-3ad36.appspot.com",
    messagingSenderId: "906564534765",
    appId: "1:906564534765:web:94cf40f2dd4526bf6827e4",
    measurementId: "G-C9L3QZ5P4B"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});