import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class User{
    // Login
    login(loginInfo){
        return _mm.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        });
    }
    // Check Login Info
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        // check whether username is empty
        if(typeof username !== 'string' || username.length ===0){
            return {
                status: false,
                msg: 'User name is empty!'
            }
        }
        // check whether password is empty
        if(typeof password !== 'string' || password.length ===0){
            return {
                status: false,
                msg: 'Password is empty!'
            }
        }
        return {
            status : true,
            msg : 'PASS'
        }
    }
    logout(){
        return _mm.request({
            type    : 'post',
            url     : '/user/logout.do'
        });
    }
    getUserList(pageNum){
        return _mm.request({
            type    : 'post',
            url     : '/manage/user/list.do',
            data    : {
                pageNum : pageNum
            }
        });
    }
}

export default User;