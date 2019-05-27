function Backtop(){
    this.oBacktop = document.querySelector(".back-top");
    this.init();
    
}
Backtop.prototype = {
    init:function(){
        this.clickoBacktop();
        this.overoBacktop();
        this.outoBacktop();
        this.scrollwindow();
    },
    clickoBacktop:function(){
        this.oBacktop.addEventListener("click",this.clickoBacktopCb.bind(this));
    },
    clickoBacktopCb:function(){
        document.documentElement.scrollTop?document.documentElement.scrollTop=0:document.body.scrollTop=0;
        // $("body,html").animate({scrollTop:0},2000);
    },
    overoBacktop:function(){
        this.oBacktop.addEventListener("mouseover",this.overoBacktopCb.bind(this));
    },
    overoBacktopCb:function(){
        this.oBacktop.style.background ="url(imgs/top.png) no-repeat -100px center #5d5f5e";
        this.oBacktop.innerText = "返回顶部";
    },
    outoBacktop:function(){
        this.oBacktop.addEventListener("mouseout",this.outoBacktopCb.bind(this));
    },
    outoBacktopCb:function(){
        this.oBacktop.style.background ="url(imgs/top.png) no-repeat -42px center #5d5f5e";
        this.oBacktop.innerText = "";
    },
    scrollwindow:function(){
        window.addEventListener("scroll",this.scrollwindowCb.bind(this));
    },
    scrollwindowCb:function(){
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if(t >= 100){
            this.oBacktop.style.display = "block";
        }else{
            this.oBacktop.style.display = "none";
        }
    }
}

new Backtop();