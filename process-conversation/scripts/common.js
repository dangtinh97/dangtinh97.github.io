const fileToData = async (nameFile)=>{
  return await new Promise((resolve)=>{
    $.ajax({
      url:'./files/'+nameFile,
      type:"GET",
      dataType:"JSON",
      success:(data)=>{
        const dataJson = data.map((item)=>{
          return JSON.parse(item.value)
        })
        return resolve(dataJson);
      }
    })
  })
}
