export const langDefault = 'en'
export const getLang=()=>{
  let lang = 'en-US';
  switch(langDefault){
    case 'vi':
      lang = 'vi-VN';
      break;
    default:
      lang = 'en-US';
      break;
  }
  return lang;
}
