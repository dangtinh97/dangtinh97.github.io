document.addEventListener('DOMContentLoaded', () => {
  let roomId = null;
  const callNotification = document.getElementById('call-notification')
  const localVideo = document.getElementById('localVideo')
  const remoteVideo = document.getElementById('remoteVideo')
  const keyOfMe = randomNumberKey(4)
  $('#key-room > strong').html(keyOfMe)
  let socket = io('https://websocket.dev.cabiz.ai/call-translate', {
    transports: ['websocket', 'polling'],
    auth: {
      key: keyOfMe
    }
  })
  socket.on('connect', () => {
    console.log('socket connected: ' + socket.id)
    socket.on('RINGING', (data) => {
      roomId = keyOfMe;
      callNotification.style.display = 'block'
    })
    socket.on('DATA', async (data) => {
      console.log('DATA===>', data.type, data)
      if (data.type === 'answer') {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp))
      }
      if (data.type === 'offer') {
        handleOffer(data.sdp).then()
      }
      if (data.type === 'candidate') {
        handleNewICECandidate(data.candidate).then()
      }
    })
  })

  async function handleOffer (offer) {
    await getLocalStream()
    createPeerConnection()
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer))

    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    socket.emit('DATA', {
      type: 'answer',
      sdp: answer,
      key: roomId,
    })
  }

  $('#joinRoomButton').on('click', () => {
    const keyJoin = $('#roomInput').val()
    roomId = keyJoin
    socket.emit('CONNECT_WITH_GUEST', {
      key: roomId,
    })
  })

  $('#acceptCallButton').on('click', () => {
    callNotification.style.display = 'none'
    getLocalStream().then(async () => {
      createPeerConnection()
      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)
      socket.emit('DATA', {
        type: 'offer',
        sdp: offer,
        key: roomId,
      })
    })
  })
  let localStream
  let peerConnection
  let remoteStream
  const getLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    localStream = stream
    localVideo.srcObject = stream
  }

  function createPeerConnection () {
    peerConnection = new RTCPeerConnection(configuration)
    peerConnection.ontrack = (event) => {
      remoteStream = event.streams[0]
      remoteVideo.srcObject = remoteStream
    }
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream))
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('DATA', {
          type: 'candidate',
          candidate: event.candidate,
          key: roomId,
        })
      }
    }
    peerConnection.oniceconnectionstatechange = () => {
      console.log('ICE state:', peerConnection.iceConnectionState)
    }
  }

  async function handleNewICECandidate (candidate) {
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(() => {
        console.log('ICE Candidate added')
      }).catch(() => {
        console.log('ICE Candidate failed to add: ', candidate.candidate.replace(/[\n\r]/g, ''))
      })
    }
  }
})
