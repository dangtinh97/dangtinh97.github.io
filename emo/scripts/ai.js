import {langDefault} from './config.js'

export class Ai {
  timeToVietnamese(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    console.log(hours,minutes);
    const hourWords = [
      'mười hai', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mười một'
    ];
    const minuteWords = [
      'không', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi'
    ];
    let hourWord = hours >= 12 ? hourWords[hours % 12] : hourWords[hours];
    let minuteWord = minutes === 0 ? 'không phút' :
      (minutes < 10 ? 'lẻ ' + minuteWords[1] + ' ' + hourWords[minutes] : minuteWords[Math.floor(minutes / 10)] + (minutes % 10 > 0 ? ' ' + hourWords[minutes % 10] : ''));
    // Special case for 12-hour
    if (hours === 0) hourWord = 'mười hai';
    return `Bây giờ là: ${hourWord} giờ ${minuteWord} phút`;
  }

  timeToEnglish(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const hourWords = [
      'twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'
    ];
    const minuteWords = [
      'o\'clock', 'five', 'ten', 'quarter past', 'twenty', 'twenty-five', 'half past', 'twenty-five to', 'twenty', 'quarter to', 'ten', 'five'
    ];
    let hourWord = hourWords[hours % 12];
    let minuteWord;
    if (minutes === 0) {
      minuteWord = 'o\'clock';
    } else if (minutes === 15) {
      minuteWord = 'quarter past';
    } else if (minutes === 30) {
      minuteWord = 'half past';
    } else if (minutes === 45) {
      minuteWord = 'quarter to';
    } else if (minutes < 30) {
      minuteWord = minuteWords[Math.floor(minutes / 5)];
      minuteWord += ' past';
    } else {
      minuteWord = minuteWords[Math.floor((60 - minutes) / 5)];
      minuteWord += ' to';
      hourWord = hourWords[(hours + 1) % 12];
    }
    return `It is ${hourWord} ${minuteWord}`;
  }

  timeNow(){
    return langDefault==='vi' ? this.timeToVietnamese(new Date) : this.timeToEnglish(new Date())
  }
}
