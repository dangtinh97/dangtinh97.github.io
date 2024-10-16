const sleep =async (ms)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      return resolve(true)
    },ms)
  })
}


const  fileToJson = async (fileName)=>{
  return new Promise(resolve => {
    $.ajax({
      url: './'+fileName,
      type:"GET",
      dataType: "JSON",
      success:(res)=>{
        const data = res.map((item)=>{
          return JSON.parse(item.value);
        })
        return resolve(data);
      }
    })
  })
}
