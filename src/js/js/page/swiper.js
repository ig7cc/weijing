function Swiper(options){
    this.banner = document.querySelector(options.el);
    this.oUl = this.banner.getElementsByTagName('ul')[0];
    this.aLi = this.oUl.getElementsByTagName('li');
    this.iw = this.aLi[0].offsetWidth;
    this.dir = this.banner.querySelectorAll('#dir>a');
    this.aA = this.banner.querySelectorAll('#circular>a');
    this.iNow = 0;
    this.timer = null;
    this.init();
}


Swiper.prototype = {
    init:function(){
        var li = this.aLi[0].cloneNode(true);
        this.oUl.appendChild(li);
        this.oUl.style.width = this.iw* this.aLi.length + "px";

        this.autoplay();
        this.bannerEvent();
        this.directionEvent();
        this.circularEvent();
    },
    circularEvent:function(){
        for(var i=0;i<this.aA.length;i++){
            this.aA[i].index = i;
            this.aA[i].addEventListener("mouseover",this.circularEventCb.bind(this,this.aA[i]))
        }
    },
    circularEventCb(that){
        for(var j=0;j<this.aA.length;j++){
            this.aA[j].className = '';
        }
        that.className = 'active';
        this.iNow = that.index;
        this.toImg();
    },
    directionEvent:function(){
        this.dir[0].addEventListener("click",this.directionEventLeft.bind(this));
        this.dir[1].addEventListener("click",this.directionEventRight.bind(this));
    },
    directionEventRight:function(){
        if(this.iNow == this.aLi.length-1){
            this.iNow = 1;
            this.oUl.style.left =0;
        }else{
            this.iNow++
        }

        this.toImg();
    },
    directionEventLeft(){
        if(this.iNow == 0){
            this.iNow = this.aLi.length - 2;
            this.oUl.style.left = -this.iw * (this.aLi.length-1) + 'px';
        }else{
            this.iNow--
        }

        this.toImg();
    },
    bannerEvent:function(){
        this.banner.addEventListener("mouseover",this.bannerovercb.bind(this));
        this.banner.addEventListener("mouseout",this.banneroutcb.bind(this))
    },
    bannerovercb:function(){
        clearInterval(this.timer);
    },
    banneroutcb:function(){
        this.autoplay();
    },
    autoplay:function(){
        this.timer = setInterval(this.autoplayCallback.bind(this),3000)
    },
    autoplayCallback(){
        if(this.iNow == this.aLi.length-1){
            this.iNow = 1;
            this.oUl.style.left = 0;
        }else{
            this.iNow++;
        }

        this.toImg();
    },
    toImg:function(){
        for(var i=0;i<this.aA.length;i++){
            this.aA[i].className = '';
        }
        this.aA[this.iNow==this.aLi.length-1?0:this.iNow].className = 'active';
        move(this.oUl,{left:-this.iNow * this.iw})
    }
}

new Swiper({
    el:"#banner"
});