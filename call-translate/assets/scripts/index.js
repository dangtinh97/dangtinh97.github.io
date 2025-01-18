document.addEventListener('DOMContentLoaded', () => {
  let roomId = null
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
      roomId = keyOfMe
      callNotification.style.display = 'block'
    })
    socket.on('DATA', async (data) => {
      console.log('DATA===>', data.type, data)
      if (data.type === 'answer') {
        $('#call-interface').remove()
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp))
      }
      if (data.type === 'offer') {
        $('#call-interface').remove()
        handleOffer(data.sdp).then()
      }
      if (data.type === 'candidate') {
        handleNewICECandidate(data.candidate).then()
      }
    })
  })

  async function handleOffer (offer) {
    await getLocalStream()
    speechToText()
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
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true, audio: {
        echoCancellation: true, // Giảm hiện tượng echo
        autoGainControl: true   // Điều chỉnh âm lượng tự động
      }
    })
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

  function speechToText () {
    const recognition = new webkitSpeechRecognition()
    recognition.lang = 'vi-VN'
    recognition.continuous = true
    recognition.interimResults = true
    recognition.onstart = function () {
      console.log('Speech recognition started')
    }

    recognition.onresult = function (event) {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      $('#speechText').html(transcript)
    }

    recognition.onerror = function (event) {
      console.error('Speech recognition error:', event.error)
    }
    recognition.onend = function () {
      console.log('Speech recognition ended')
      recognition.start() // Restart recognition if needed
    }

// Bắt đầu nhận dạng giọng nói
    recognition.start()
  }
  let isMuted = false;
  function toggleMute() {
    // Lấy các track âm thanh từ stream
    const audioTracks = localStream.getAudioTracks();

    // Nếu microphone đang bật, tắt nó
    if (isMuted) {
      audioTracks.forEach(track => track.enabled = true); // Bật lại microphone
      document.getElementById('muteButton').innerText = 'Mute Microphone';
    } else {
      audioTracks.forEach(track => track.enabled = false); // Tắt microphone
      document.getElementById('muteButton').innerText = 'Unmute Microphone';
    }

    // Đổi trạng thái mute
    isMuted = !isMuted;
  }

// Lắng nghe sự kiện click để tắt/bật microphone
  document.getElementById('muteButton').addEventListener('click', toggleMute);
})
