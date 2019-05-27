function Login(){
    this.init();
}

Login.prototype = {
    init(){
        this.submit();
        this.toRegister();
    },
    submit(){
        this.js_login_btn = document.getElementById("js_login_btn");
        this.js_login_username = document.getElementById("js_login_username");
        this.js_login_password = document.getElementById("js_login_password");
        this.js_login_btn.addEventListener("submit",this.submitCb.bind(this));
    },
    submitCb(e){
        var e = e ||event;
        e.preventDefault?e.preventDefault():e.returnValue = false;
        axios({
            method:"post",
            url:"http://localhost/weijinggit/src/php/login.php",
            data:{
                username:this.js_login_username.value,
                password:this.js_login_password.value
            }
        }).then(this.loginSuccess.bind(this))
    },
    loginSuccess(data){
        if(data.status){
            alert(data.info);
            location.href = "http://localhost/weijinggit/src/index.html"
        }else{
            alert(data.info);
        }
    },
    toRegister(){
        var js_bgRegister = document.getElementById("js_bgRegister");
        js_bgRegister.addEventListener("click",this.toRegisterCb.bind(this));
    },
    toRegisterCb(){
        location.href = "http://localhost/weijinggit/src/html/register.html";
    }
}

new Login();