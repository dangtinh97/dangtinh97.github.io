function showQrCode (text) {
  showModal(MODAL_DATA.qrcode)
  const qrcode = new QRCode('qrcode',
    text)
}
