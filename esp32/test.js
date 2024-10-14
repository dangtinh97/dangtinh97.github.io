const axios = require('axios');
let data = JSON.stringify({
  "message": "Ông Nguyễn Xuân Thông cựu cán bộ Ủy ban Kiểm tra Đảng ủy Công an Trung ương bị cáo buộc biết rõ giám đốc doanh nghiệp có hành vi đưa hối lộ song vẫn hướng dẫn cách khai báo gian dối"
});

for (let i=0;i<100;i++){
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://text-processing.dev.cabiz.ai/api',
    headers: {
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({
      "message": i+". Ông Nguyễn Xuân Thông cựu cán bộ Ủy ban Kiểm tra Đảng ủy Công an Trung ương bị cáo buộc biết rõ giám đốc doanh nghiệp có hành vi đưa hối lộ song vẫn hướng dẫn cách khai báo gian dối"
    })
  };
  let timeS = new Date().getTime();
  axios.request(config)
    .then((response) => {
      console.log({
        ...response.data,
        stt:i,
        duration: timeS - new Date().getTime()
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
