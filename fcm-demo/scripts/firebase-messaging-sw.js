importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

// 2. Khởi tạo (Lấy thông số từ Firebase Console)
firebase.initializeApp({
    apiKey: "AIzaSyC5ldFjB0KwtbLDQQRdvUE2mp4EyUlBDvg",
    authDomain: "balheh.firebaseapp.com",
    projectId: "balheh",
    storageBucket: "balheh.firebasestorage.app",
    messagingSenderId: "554741615522",
    appId: "1:554741615522:web:aa9f3083d4379b50f900fb",
    measurementId: "G-6PRGLRR5LC"
});

const messaging = firebase.messaging();

// 3. Lắng nghe thông báo khi ứng dụng ở chế độ nền (Background)
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Nhận tin nhắn nền:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'icon.png', // Đường dẫn icon của bạn
        data: {}
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    // 👉 lấy lại url đã gửi từ server
    const url = event.data?.fcm_url || "/";

    const fullUrl = self.location.origin + url;

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true })
            .then(clientList => {

                // nếu đã có tab đúng → focus
                for (const client of clientList) {
                    if (client.url === fullUrl && 'focus' in client) {
                        return client.focus();
                    }
                }

                // chưa có → mở mới
                return clients.openWindow(fullUrl);
            })
    );
});