function Goodslist(){
    this.init();
    this.oGoodslist = document.getElementById("goodslist");
    this.oBtnList = document.querySelector(".btnList");
    this.oLast = document.querySelector(".last");
    this.oFirst = document.querySelector(".first");
    //页码   初始值位1
    this.iNow = 1;
    
}

Goodslist.prototype = {
    init(){
        this.getGoodsdata();
    },
    //通过ajax从数据库中获取要渲染的数据
    getGoodsdata(){
        // console.log(11);
        axios({
            method:"get",
            url:"http://localhost/weijinggit/src/php/getgoods.php"
        }).then(this.getGoodsdataSuccess.bind(this))
    },
    //获取到数据  做分页渲染
    getGoodsdataSuccess(data){
        // console.log(this.oBtnList);
        this.data = data;
        //计算要分出的页数
        this.pages = Math.ceil(this.data.length/8);
        //根据页数遍历  创造页码a标签，在下一页之前插入页码
        for(var i=0;i<this.pages;i++){
            this.a = document.createElement("a");
            this.a.innerText = i+1;
            this.a.className = "page";
            this.oBtnList.insertBefore(this.a,this.oLast);
        }
        //初始渲染第一页
        this.render(1);
        this.clickoBtnList();
        this.clickoGoodslist();
    },
    //渲染每页的数据
    render(page){
        var str = "";
        for(var i=(page-1)*8;i<Math.min(page*8,this.data.length);i++){
            str += `<li data-id="${this.data[i].gid}">
            <img src="imgs/${this.data[i].gimg}">
            <h4>${this.data[i].gh4}</h4>
            <p>${this.data[i].gp}</p>
            <span>${this.data[i].gprice}</span>
            <a href="#" class="js_jumpitem">立即购买</a>
        </li>`;
        }
        this.oGoodslist.innerHTML = str;
    },
    //事件代理，给页码组添加点击事件
    clickoBtnList(){
        this.oBtnList.addEventListener("click",this.clickoBtnListCb.bind(this));
    },
    clickoBtnListCb(e){
        var e = e || event;
        var target = e.target || e.srcElement;
        //点击页码切换数据渲染
        if(target.tagName == "A" && target.className == "page"){
            var n = Number(target.innerText);
            this.iNow = n;
            console.log("点击页码"+this.iNow);
            this.render(n);
        }
        //点击上一页切换
        if(target.tagName == "A" && target.className == "first"){
            if(this.iNow == 1){
                this.iNow = 1;
                console.log("点击上一页"+this.iNow);
            }else{
                this.iNow--;
                console.log("点击上一页--"+this.iNow);
            }
            this.render(this.iNow);
        }
        //点击下一页切换
        if(target.tagName == "A" && target.className == "last"){
            if(this.iNow == this.pages){
                this.iNow = this.pages;
                console.log("点击下一页"+this.iNow);
            }else{
                this.iNow++;
                console.log("点击下一页++"+this.iNow);
            }
            this.render(this.iNow);
        }
    },
    //事件代理  给列表 添加点击事件  当点击立即购买跳转对应的详情页
    clickoGoodslist(){
        this.oGoodslist.addEventListener("click",this.clickoGoodslistCb.bind(this));
    },
    clickoGoodslistCb(e){
        var e = e || event;
        var target = e.target || e.srcElement;
        if(target.tagName == "A" && target.className == "js_jumpitem"){
            //获取被点击商品的id
            var id = target.parentNode.getAttribute("data-id");
            //跳转到当前id商品的详情页
            location.href = "detail.html?id="+id;
        }
    }  
}

new Goodslist();