const randomNumberKey = (length=4)=>{
  const randomNumbers = Array.from({ length: length }, () => Math.floor(Math.random() * 10));
  return randomNumbers.join('');
}
const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" } // STUN server của Google
  ]
};
