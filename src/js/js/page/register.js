function Register(){
    this.init();
}

Register.prototype = {
    init(){
        this.submitForm();
        this.toLoginclick();
    },
    submitForm(){
        this.js_register_btn = document.getElementById("js_register_btn");
        this.js_register_username = document.getElementById("js_register_username");
        this.js_register_password = document.getElementById("js_register_password");
        this.js_register_btn.addEventListener("submit",this.submitFormCb.bind(this));
    },
    submitFormCb(e){
        var e = e || event;
        e.preventDafult?e.preventDafult():e.returnValue = false;
        axios({
            method:"post",
            url:"http://localhost/weijinggit/src/php/register.php",
            data:{
                username:this.js_register_username.value,
                password:this.js_register_password.value
            }
        }).then(this.registerSuccess.bind(this))
    },
    registerSuccess(data){
        if(data.status){
            alert(data.info);
            setTimeout(this.Tologin.bind(this),2000)
        }else{
            alert(data.info);
        }
    },
    Tologin(){
        location.href = "http://localhost/weijinggit/src/html/login.html";
    },
    toLoginclick(){
        var js_bgLogin = document.getElementById("js_bgLogin");
        js_bgLogin.addEventListener("click",this.toLoginclickCb.bind(this));
    },
    toLoginclickCb(){
        location.href = "http://localhost/weijinggit/src/html/login.html";
    }
}
new Register();