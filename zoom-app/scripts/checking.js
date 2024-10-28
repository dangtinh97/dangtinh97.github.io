document.addEventListener("DOMContentLoaded",()=>{
  navigator.mediaDevices.ondevicechange = function (){
    getAudioInputDevices().then(r=>checkingVirtual(r));
  }

// Call the function to get audio devices and start recognition
  getAudioInputDevices().then(r=>checkingVirtual(r));

  const checkingVirtual = ({installed, isDefault, audioDevices})=>{
    modalHide();
    console.log(installed, isDefault, audioDevices)
    if(!installed){
      return showModal(MODAL_DATA.virtual,'Please install Cabiz.AI Virtual to use this website.')
    }

    if(!isDefault){
      return showModal(MODAL_DATA.virtual,'Please select Cabiz.AI Virtual as the default sound input for the system.')
    }
  }

})
