"use strict";function Login(){this.init()}Login.prototype={init:function(){this.submit(),this.toRegister()},submit:function(){this.js_login_btn=document.getElementById("js_login_btn"),this.js_login_username=document.getElementById("js_login_username"),this.js_login_password=document.getElementById("js_login_password"),this.js_login_btn.addEventListener("submit",this.submitCb.bind(this))},submitCb:function(t){(t=t||event).preventDefault?t.preventDefault():t.returnValue=!1,axios({method:"post",url:"http://localhost/weijinggit/src/php/login.php",data:{username:this.js_login_username.value,password:this.js_login_password.value}}).then(this.loginSuccess.bind(this))},loginSuccess:function(t){t.status?(alert(t.info),location.href="http://localhost/weijinggit/src/index.html"):alert(t.info)},toRegister:function(){document.getElementById("js_bgRegister").addEventListener("click",this.toRegisterCb.bind(this))},toRegisterCb:function(){location.href="http://localhost/weijinggit/src/html/register.html"}},new Login;