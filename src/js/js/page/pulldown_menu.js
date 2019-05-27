function Pulldown() {
    this.init();
}
Pulldown.prototype = {
    init() {
        
        axios({
            method: "get",
            url: "http://localhost/weijinggit/src/php/nav.php",
        }).then(this.getdataSuccess.bind(this))
    },
    //从数据库获取数据
    getdataSuccess(data) {
        this.data = data;
        this.mouseNav();
    },
    mouseNav() {
        this.nav = document.querySelectorAll(".header_nav");
        for(var i=0;i<this.nav.length;i++){
            this.nav[i].addEventListener("mouseenter", this.mouseenterNavCb.bind(this,this.nav[i]));
            this.nav[i].addEventListener("mouseleave", this.mouseleaveNavCb.bind(this,this.nav[i]));
        }
    },
    mouseenterNavCb(that) {
        that.children[1].style.display = "block";
        var sort =that.children[0].getAttribute("data-sort"); 
        var str = "";
        for(var i=0;i<this.data.length;i++){
            if(this.data[i].nsort == sort){
                str += `<li>
                            <a href="##">
                                <img src="imgs/${this.data[i].nimg}" alt="">
                                <h3>${this.data[i].nh3}</h3>
                                <p>${this.data[i].np}</p>
                            </a>
                        </li>`;
            }      
        }
        that.children[1].children[0].innerHTML = str;
    },
    mouseleaveNavCb(that){
        that.children[1].style.display = "none";
    }
}

new Pulldown();