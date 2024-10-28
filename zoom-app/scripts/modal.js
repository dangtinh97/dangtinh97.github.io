const myModal = new bootstrap.Modal('#myModal', {
  keyboard: false
})
function modalHide(){
  myModal.hide()
}

const MODAL_DATA = {
  'virtual':{
    'title':'Cabiz Notification',
    'show_footer':false,
  },
  'qrcode':{
    'title':'Cabiz Notification',
    'show_footer':false,
    'body':'Please use the Cabiz.ai app to scan this QR code and continue.'
  }
}


function showModal(data,body=null){
  $('.modal-body > #content').html(body || data.body)
  $('.modal-title').html(data.title)
  $('.modal-footer').show()
  if(!data.show_footer){
    $('.modal-footer').hide()
  }
  return myModal.show()
}
