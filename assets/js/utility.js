const BASE_URL= 'https://web-app-5euxxskrra-uc.a.run.app'
// const BASE_URL= 'http://supper-app.test'
const API = {
    user_post : BASE_URL+'/users',
    user_search:BASE_URL+'/users',
    send_message:BASE_URL+'/chats',
    get_message:BASE_URL+'/chats',
    list_chat:BASE_URL+'/chats/manager',
}

let requestAjax =async (url,method,data=null,headers={})=>{
    let res = {};
    await $.ajax({
        url:url,
        type:method,
        dataType:"JSON",
        data:data,
        headers: headers,
        success:function (e){
            res  =e;
        }
    }).fail(function (e){
        console.log(e);
        res  ={
            success:false,
            status:500,
            content:'ERROR SERVER',
            data:{}
        }
    })
    return res
}

