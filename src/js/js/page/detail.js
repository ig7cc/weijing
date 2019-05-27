function Detailgoods(){
    this.init();
}

Detailgoods.prototype ={
    init(){
        this.getDetaildata();
    },
    getDetaildata(){
        this.id = location.href.split("?")[1].split("=")[1];
        axios({
            method:"get",
            url:"http://localhost/weijinggit/src/php/detail.php",
            data:{id:this.id}
        }).then(this.getDetaildataSuc.bind(this))
    },
    getDetaildataSuc(data){
        console.log(data)
        this.render(data);
    },
    render(data){
        this.oDetail = document.getElementById("detail");
        var smallstr = "";
        for(var i=0;i<data.dsmallimg.split(",").length;i++){
            smallstr +=`<li><img src="imgs/${data.dsmallimg.split(",")[i]}" data-src="imgs/${data.dbigimg.split(",")[i]}" class="minimg" alt=""></li>`;
        }
        str = `<ul class="smallPic">
                    ${smallstr}
                </ul>
                <div class="maxPic">
                    <div class="filter"></div>
                    <img src="imgs/${data.dbigimg.split(",")[0]}" class="js_maxPic" alt="">
                </div>
                <div class="text_box">
                    <p class="introduce">${data.dintro}</p>
                    <p class="message">${data.dmes}</p>
                    <p class="soldprice">${data.dprice}</p>
                    <div class="scolor"> <i>选择颜色</i> <span></span></div>
                    <div class="choosebtn">
                        <span class="snum">选择数量</span>
                        <div class="btns">
                            <button class="reduce">-</button>
                            <input type="text" name="" id="" value="1">
                            <button class="add">+</button>
                        </div>
                    </div>
                    <button class="cart">加入购物车</button>
                    <button class="lookCart">查看购物车</button>
                </div>
                <div class="maxImg">
                    <img src="imgs/${data.dbigimg.split(",")[0]}" class="js_maxImg" alt="">
                </div>`;
        this.oDetail.innerHTML = str;

        this.maxPic = document.querySelector(".maxPic");
        this.js_maxImg = document.querySelector(".js_maxImg");
        this.filter = document.querySelector(".filter");
        this.maxImg = document.querySelector(".maxImg");
        this.overmaxPic();
        this.outmaxPic();
        this.mouseoveroDetail();
        this.clickoDetail();
    },
    overmaxPic(){  
        this.maxPic.addEventListener("mouseover",this.overmaxPicCb.bind(this));
    },
    overmaxPicCb(){
        this.filter.style.display = "block";
        this.maxImg.style.display = "block";
        this.moveFilter();
    },
    moveFilter(){
        this.filter.addEventListener("mousemove",this.moveFilterCb.bind(this));
    },
    moveFilterCb(e){
        var e = e || event;
        var x = e.pageX - offset(this.maxPic).l - this.filter.offsetWidth / 2;
        var y = e.pageY - offset(this.maxPic).t - this.filter.offsetHeight / 2;
        x = x >= this.maxPic.offsetWidth - this.filter.offsetWidth ? this.maxPic.offsetWidth - this.filter.offsetWidth : x <= 0 ? 0 : x;
        y = y >= this.maxPic.offsetHeight - this.filter.offsetHeight ? this.maxPic.offsetHeight - this.filter.offsetHeight : y <= 0 ? 0 : y;
        this.filter.style.left = x + "px";
        this.filter.style.top = y + "px";
        this.js_maxImg.style.left = -2 * x + "px";
        this.js_maxImg.style.top = -2 * y + "px";
    },
    outmaxPic(){
        this.maxPic.addEventListener("mouseout",this.outmaxPicBc.bind(this));
    },
    outmaxPicBc(){
        this.filter.style.display = "none";
        this.maxImg.style.display = "none";
    },
    //划过小图切换大图 事件代理
    mouseoveroDetail(){
        this.oDetail.addEventListener("mouseover",this.mouseoveroDetailCb.bind(this));
    },
    mouseoveroDetailCb(e){
        var e = e || event;
        var target = e.target || e.srcElement;
        if(target.tagName == "IMG" && target.className == "minimg"){
            var src = target.getAttribute("data-src"); 
            target.parentNode.parentNode.nextElementSibling.children[1].src = src;
            target.parentNode.parentNode.parentNode.children[3].children[0].src = src;
        }
    //     if(target.tagName == "IMG" && target.className == "js_maxPic"){
    //         target.previousElementSibling.style.display = "block";
    //         target.parentNode.parentNode.children[3].style.display = "block";
    //         // target.addEventListener("mouseout",this.outjs_maxPic.bind(this,target));
    //     }
    //     if(target.tagName == "DIV" && target.className == "filter"){
    //         target.addEventListener("mousemove",this.moveFilter.bind(this,target));
    //     }
    // },
    // moveFilter(target,e){
    //     var maxPic = target.parentNode;
    //     var js_maxImg = target.parentNode.parentNode.children[3].children[0];
    //     var x = e.pageX - offset(maxPic).l - target.offsetWidth / 2;
    //     var y = e.pageY - offset(maxPic).t - target.offsetHeight / 2;
    //     x = x >= maxPic.offsetWidth - target.offsetWidth ? maxPic.offsetWidth - target.offsetWidth : x <= 0 ? 0 : x;
    //     y = y >= maxPic.offsetHeight - target.offsetHeight ? maxPic.offsetHeight - target.offsetHeight : y <= 0 ? 0 : y;
    //     target.style.left = x + "px";
    //     target.style.top = y + "px";
    //     js_maxImg.style.left = -2 * x + "px";
    //     js_maxImg.style.top = -2 * y + "px";
    },
    clickoDetail(){
        this.oDetail.addEventListener("click",this.clickoDetailCb.bind(this));
    },
    clickoDetailCb(e){
        var e = e || event;
        var target = e.target || e.srcElement;
        // 商品增加
        if (target.tagName == "BUTTON" && target.className == "add") {
            target.previousElementSibling.value++;
        }
        // 商品减
        if (target.tagName == "BUTTON" && target.className == "reduce") {
            // 判断当商品数量减到1时，不再减少
            if (target.nextElementSibling.value == 1) {
                return;
            }
            target.nextElementSibling.value--;
        }
        if(target.tagName == "BUTTON" && target.className == "cart"){
            var num = target.previousElementSibling.children[1].children[1].value;
            if(!localStorage.getItem("dgoods")){
                localStorage.setItem("dgoods",JSON.stringify([{id:this.id,num:num}]));
            }else{
                var obj = JSON.parse(localStorage.getItem("dgoods"));
                console.log(obj);
                // 设置开关门
                var bStop = true;
                for(var i=0;i<obj.length;i++){
                    // 是当前商品
                    if(obj[i].id ==this.id){
                        obj[i].num = num;
                        bStop = false;
                        localStorage.setItem("dgoods",JSON.stringify(obj));
                        break;
                    }
                }
                //不是当前商品
                if(bStop){
                    obj.push({id:this.id,num:num});
                    localStorage.setItem("dgoods",JSON.stringify(obj));
                }
            }
        }
        if(target.tagName == "BUTTON" && target.className == "lookCart"){
            location.href = "shoppingCart.html";
        }
    } 
}

new Detailgoods();