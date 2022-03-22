self.addEventListener('install', (e) => {
    console.log('Service worker installed');
});

self.addEventListener('activate', (e) => {
    console.log('Service worker activated');
});

self.addEventListener("push",function (event){
    const notificationPromise = self.registration.showNotification("test",{
        body: "body",
        tag: "message"
    })
    console.log("PUSH")

    event.waitUntil(notificationPromise);
})