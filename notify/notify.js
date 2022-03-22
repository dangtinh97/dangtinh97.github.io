document.addEventListener("DOMContentLoaded",function (){
    console.log("a")
    if ("Notification" in window) {
        Notification.requestPermission().then(function (permission) {
            $("#alert").html(permission)
            if(permission==="granted") return serviceWorker()

        });
    }else {
        $("#alert").html("Not support")
    }

    function serviceWorker()
    {
        if (!('serviceWorker' in navigator)) {
            return $("#alert").html('Service Worker isn\'t supported on this browser, disable or hide UI.');
        }

        if (!('PushManager' in window)) {
            // Push isn't supported on this browser, disable or hide UI.
            return $("#alert").html('Push isn\'t supported on this browser, disable or hide UI.');

        }

        return navigator.serviceWorker.register('./service-worker.js')
            .then(function(registration) {
                $("#alert").html('Service worker successfully registered.');
                const subscribeOptions = {
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                        'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
                    )
                };
                return registration.pushManager.subscribe(subscribeOptions);
            })
            .then(function(pushSubscription) {
                console.log(pushSubscription)
                console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
                return pushSubscription;
            })
            .catch(function(err) {
                console.error('Unable to register service worker.', err);
            });
    }

    function urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

})