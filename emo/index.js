const fs = require('fs');
const path = require('path');

const folders = fs.readdirSync('emotions');
let dataSave = {};
folders.forEach((name)=>{
  const files = fs.readdirSync(`emotions/${name}`);
  try{
    files.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });
    dataSave[name] = files.map((item)=>{
      return `/emotions/${name}/${item}`
    });
  }catch (e) {
    console.log(files,name)
  }

})
fs.writeFileSync('emotions.json',JSON.stringify(dataSave))
