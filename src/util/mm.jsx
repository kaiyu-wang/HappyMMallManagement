class MUtil{
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type        : param.type        || 'get',
                url         : param.url         || '',
                dataType    : param.dataType    || 'json',
                data        : param.data        || null,
                success     : res => {
                    // data request success
                    if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    }
                    // no login status, do login
                    else if(10 === res.status){
                        this.doLogin();
                    }
                    else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error       : err => {
                   typeof reject === 'function' && reject(err.statusText);
                }
            });
        });  
    }
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    errorTips(errMsg){
        alert(errMsg || 'This is an error');
    }
    setStorage(name, data){
        let dataType = typeof data;
        // json obj
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        // basic data type
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data);
        }
        // type not support
        else{
            alert('This data type is not support');
        }
    }
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil;