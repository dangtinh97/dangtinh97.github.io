let socket;
import { Socket } from './socket.js'
document.addEventListener("DOMContentLoaded",()=>{
  socket = new Socket()

  $('#connect').on('click',()=>{
    let roomId = $('#room-id').val().trim()
    if(roomId!==''){
      socket.joinRoom(roomId)
    }
  })
  const image = document.getElementById("circleImage");
  image.addEventListener("click", function (e) {
    let find = $('.btn-rec').find('.ripple')
    if(find.length===0){
      //addAnimation()
    }

  });


  $('#circleImage').on('touchstart',()=>{
    addAnimation();
  }).on('touchend',()=>{
    $('.ripple').remove()
  })

  // document.addEventListener('touchstart', function(e) {
  //   if (e.target.id === 'IMG') {
  //     e.preventDefault();
  //   }
  // });

  function addAnimation(){
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    // Thêm ripple vào container
    image.parentElement.appendChild(ripple);

    // Xóa ripple sau khi animation kết thúc
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  }
})