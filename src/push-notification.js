import firebase from 'firebase'
export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: "301646883755"
    })
    navigator.serviceWorker
        .register('service-worker.js')
        .then((registration) => {
            firebase.messaging().useServiceWorker(registration);
        })
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('User token : ', token);

        return token;
    } catch (error) {
        console.error(error);
    }
}