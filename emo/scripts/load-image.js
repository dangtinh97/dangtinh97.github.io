export class LoadImage {
  dataImage = {};
  constructor () {
    this.loadImage().then((res)=>{
      this.dataImage = res;
    })
  }
  loadImage = ()=>{
    return new Promise((resolve) => {
      $.ajax({
        url: './scripts/emotions.json',
        type: 'GET',
        dataType: 'JSON',
        success: (res) => {
          return resolve(res)
        }
      })
    })
  }
}
