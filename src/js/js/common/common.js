/*
    随机数字  随机出现n-m 之间的数字 
    n:number  必填
    m:number  必填
*/
function numRandom(n, m) {
    if (n > m) {
        return parseInt(m + Math.random() * (n - m + 1));
    } else {
        return parseInt(n + Math.random() * (m - n + 1));
    }
}

//获取数组中最大值
function getMax(arr) {
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    return max;
}

//获取数组中最小值
function getMin(arr) {
    var min = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (min > arr[i]) {
            min = arr[i];
        }
    }

    return min;
}


//获取数组中最小值的下标
function getMinIndex(arr) {
    var min = arr[0];
    var index = 0;
    for (var i = 0; i < arr.length; i++) {
        if (min > arr[i]) {
            min = arr[i];
            index = i;
        }
    }

    return index;
}

// 冒泡排序
function bubbsort(arr) {
    var temp;
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }

        }
    }

    return arr;
}

//选择排序
function selectSort(arr) {
    var temp;
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {

            if (arr[i] > arr[j]) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }

        }
    }

    return arr;
}

// 快排
function QuickRow(arr) {
    //取中间值
    var index = arr.length % 2 == 0 ? arr.length / 2 : (arr.length + 1) / 2;
    //中间值
    var mid = arr[index];

    var left = [];
    var right = [];


    if (arr.length < 2) {
        return arr;
    }

    //核心
    for (var i = 0; i < arr.length; i++) {
        if (index != i && arr[i] < mid) {
            left.push(arr[i]);
        }
        if (index != i && arr[i] >= mid) {
            right.push(arr[i]);
        }
    }
    return QuickRow(left).concat(mid).concat(QuickRow(right));
}

//判断数组中是否存在某个值  返回值 true  false
function has(arr, n) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == n) {
            return true;
        }
    }

    return false;
}

//数组去重
function norepeat(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!has(newArr, arr[i])) {
            newArr.push(arr[i]);
        }
    }

    return newArr;
}


//随机颜色
function randomColor() {
    var r = numRandom(0, 255);
    var g = numRandom(0, 255);
    var b = numRandom(0, 255);

    return "rgb(" + r + "," + g + "," + b + ")";
}

//随机颜色2
function randomColorTo() {
    var r = numRandom(0, 255);
    var g = numRandom(0, 255);
    var b = numRandom(0, 255);
    return "#" + colorZero(r, g, b);

}

function colorZero(R, G, B) {
    var r = R.toString(16).length < 2 ? "0" + R.toString(16) : R.toString(16);
    var g = G.toString(16).length < 2 ? "0" + G.toString(16) : G.toString(16);
    var b = B.toString(16).length < 2 ? "0" + B.toString(16) : B.toString(16);

    return "" + r + g + b;
}

//获取当前时间
function getDate(d, sign) {
    sign = sign ? sign : "/";

    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();

    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    return year + sign + dZero(month) + sign + dZero(date) + " " + dZero(h) + ":" + dZero(m) + ":" + dZero(s);
}

function dZero(n) {
    n = n < 10 ? "0" + n : n;

    return n;
}

// 获取非行间样式
function getStyle(ele, attr) {
    if (ele.currentStyle) {
        return ele.currentStyle[attr];
    } else {
        return getComputedStyle(ele, false)[attr];
    }
}

// 显示隐藏
function show(ele) {
    ele.style.display = "block";
}
function hide(ele) {
    ele.style.display = "none";
}
//封装id
function $(ele) {
    return document.getElementById(ele);
}

//设置 获取自定义属性
function attr() {
    if (arguments.length == 3) {
        arguments[0].setAttribute(arguments[1], arguments[2]);
    } else if (arguments.length == 2) {
        return arguments[0].getAttribute(arguments[1]);
    } else {
        return;
    }
}

//距离页面的偏移量
function offset(ele) { 
    var obj = {}
    obj.l = ele.offsetLeft;
    obj.t = ele.offsetTop;

    while(ele.offsetParent){
        ele = ele.offsetParent;

        obj.l += ele.offsetLeft;
        obj.t += ele.offsetTop;
    }

    return obj;
}
//事件监听的封装
function on(ele,eventName,callback,bool){
    if(window.addEventListener){
        ele.addEventListener(eventName,callback,bool?true:false);
    }else{
        ele.attachEvent("on"+eventName,callback);
    }
}
//设置cookie
function setCookie(key,val,expires){
    var d = new Date();
    d.setDate(d.getDate()+expires);

    document.cookie = key+"="+val+";path=/;expires="+d;
}

function getCookie(key){
    var cookies = document.cookie;
    var arr = cookies.split("; ");
    for(var i=0;i<arr.length;i++){
        var newArr = arr[i].split("=");
        if(newArr[0] == key){
            return newArr[1];
        }
    }
}


function removeCookie(key){
    setCookie(key,"",-1);
}

//完美运动框架
function move(ele, obj, callback) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var bStop = true;
        for (var attr in obj) {
            //获取当前元素的属性的起始位置
            var iCur;
            if (attr == "opacity") {
                iCur = getStyle(ele, attr) * 100;
            } else {
                iCur = parseInt(getStyle(ele, attr));
            }
            //算速度
            var speed = (obj[attr] - iCur) / 8;
            speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);

            
            //查看谁还没有到
            if(obj[attr] != iCur){
                bStop = false;
            }

            //运动原理
            if (attr == "opacity") {
                ele.style.opacity = (iCur + speed) / 100;
                ele.style.filter = 'alpha(opacity:' + (iCur + speed) + ')';
            } else {
                ele.style[attr] = iCur + speed + 'px';
            }
           
        }
         //终止条件
        if(bStop){
            clearInterval(ele.timer);
            callback && callback();
        }
    }, 30)
}


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
        this.oUl.style.width = this.iw * this.aLi.length + 'px';

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

