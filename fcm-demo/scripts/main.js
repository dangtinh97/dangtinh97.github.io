function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

async function requestPermission() {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        console.log("✅ Đã cấp quyền");
        return true;
    }

    if (permission === "denied") {
        console.log("❌ Bị từ chối");
        return false;
    }

    console.log("⚠️ Người dùng chưa quyết định");
    return false;
}

function getToken(){
    return window.localStorage.getItem('token') ?? ''
}

async function unSubscribe(){
    const registrations = await navigator.serviceWorker.getRegistrations();

    for (let reg of registrations) {
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
            await sub.unsubscribe();
            console.log("❌ Unsubscribed");
        }

        await reg.unregister();
        console.log("🧹 Unregistered SW");
    }

    const keys = await caches.keys();
    for (let key of keys) {
        await caches.delete(key);
        console.log("🧹 Deleted cache:", key);
    }

    console.log("🔥 Reset done");
}

async function  sleep(ms){
    Promise.resolve().then(() => setTimeout(ms));
}