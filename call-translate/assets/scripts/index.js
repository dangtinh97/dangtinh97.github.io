document.addEventListener("DOMContentLoaded",()=>{
  const callNotification = document.getElementById("call-notification");
  const localVideo = document.getElementById("localVideo");
  const remoteVideo = document.getElementById("remoteVideo");
  const keyOfMe = randomNumberKey(4);
  $('#key-room > strong').html(keyOfMe);
  let socket = io('https://websocket.dev.cabiz.ai/call-translate',{
    transports: ['websocket','polling'],
    auth:{
      key: keyOfMe
    }
  })
  socket.on('connect',()=>{
    console.log('socket connected: '+ socket.id);
    socket.on('RINGING',(data)=>{
      callNotification.style.display = "block";
    })
    socket.on('DATA',async (data)=>{
      console.log(data);
      if(data.type==='answer'){
        await peerConnection.setRemoteDescription(data.sdp);
      }
      if(data.type==='offer'){
        handleOffer(data.sdp).then()
      }

      if(data.type==='iceCandidate'){
        console.log('iceCandidate',data.candidate);
        handleNewICECandidate(data.candidate).then()
      }
    })
  })

  async function handleOffer(offer) {
    await getLocalStream();
    createPeerConnection();

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit('DATA',{
      type: 'answer',
      sdp: answer,
      key: keyOfMe,
    })
    console.log("Answer sent:", answer);
  }

  $('#joinRoomButton').on('click',()=>{
    const keyJoin = $('#roomInput').val();
    socket.emit('CONNECT_WITH_GUEST',{
      key: keyJoin,
    });
  })

  $('#acceptCallButton').on('click',()=>{
    callNotification.style.display = "none";
    getLocalStream().then(async ()=>{
      createPeerConnection()
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('DATA',{
        type: 'offer',
        sdp: offer,
        key: keyOfMe,
      });
    });
  })
  let localStream;
  let peerConnection;
  let remoteStream;
  const getLocalStream =async ()=>{
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream = stream;
    localVideo.srcObject = stream;
  }

  function createPeerConnection() {
    peerConnection = new RTCPeerConnection(configuration);

    // Khi nhận được stream từ đối tác
    peerConnection.ontrack = (event) => {
      remoteStream = event.streams[0];
      remoteVideo.srcObject = remoteStream;
    };

    // Gửi các luồng media cục bộ tới đối tác
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Thiết lập ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Gửi ICE candidate tới signaling server (gửi qua WebSocket)
        console.log("New ICE Candidate:", event.candidate);
        socket.emit('DATA',{
          type: 'iceCandidate',
          candidate: event.candidate,
          key: keyOfMe,
        });
      }
    };
  }

  async function handleNewICECandidate(candidate) {
    if(peerConnection){
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }
})
