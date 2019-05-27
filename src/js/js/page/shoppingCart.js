function Shoppingcart() {
    this.init();
}

Shoppingcart.prototype = {
    init() {
        this.getCartData();
    },
    getCartData() {

        axios({
            method: "get",
            url: "http://localhost/weijinggit/src/php/shoppingCart.php",
        }).then(this.getCartDataSuccess.bind(this))
    },
    getCartDataSuccess(data) {
        console.log(data);
        this.render(data);
    },
    render(data) {
        if (localStorage.dgoods) {
            // console.log(111)
            this.obj = JSON.parse(localStorage.dgoods);
            var str = "";
            var aBox = document.getElementsByClassName("box")[0];
            console.log(this.obj);
            for (var i = 0; i < this.obj.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (this.obj[i].id == data[j].did) {
                        str += `<ul class="television" data-id="${this.obj[i].id}">
                    <li>
                        <label for="">
                            <input type="checkbox" class="single" value="" />
                        </label>
                        <img src="imgs/${data[j].dsmallimg.split(",")[0]}" />
                    </li>
                    <li>${data[j].dintro} </li>
                    <li>${data[j].dprice}</li>
                    <li>
                        <button class="reduce">-</button>
                        <input type="text" name="" id="" value="${this.obj[i].num}" />
                        <button class="add">+</button>
                    </li>
                    <li>￥${(this.obj[i].num*data[j].dprice.slice(1)).toFixed(2)}</li>
                    <li>
                        <a href="##" class="del">删除</a>
                    </li>
                </ul>`;
                    }
                }
            }
            // console.log(str)
            aBox.innerHTML = str;
        }
        this.clickShoppingcart();
    },
    clickShoppingcart() {
        var shoppingCart = document.querySelector(".shoppingCar");
        shoppingCart.addEventListener("click", this.clickShoppingcartCb.bind(this));
    },
    clickShoppingcartCb(e) {
        var e = e || event;
        var target = e.target || e.srcElement;
        //商品减少
        if (target.tagName == "BUTTON" && target.className == "reduce") {
            if (target.nextElementSibling.value == 1) {
                return;
            }
            target.nextElementSibling.value--;
            // localStorage
            var id = target.parentNode.parentNode.getAttribute("data-id");
            //修改localStorage中这个id的num
            for (var i = 0; i < this.obj.length; i++) {
                if (this.obj[i].id == id) {
                    this.obj[i].num = target.nextElementSibling.value;
                    console.log(this.obj);
                    localStorage.setItem("dgoods", JSON.stringify(this.obj));
                }
            }
            
            var sum = target.nextElementSibling.value * target.parentNode.previousElementSibling.innerText.substr(1);
            target.parentNode.nextElementSibling.innerText = "￥" + sum.toFixed(2);
        }
        //商品增加
        if (target.tagName == "BUTTON" && target.className == "add") {
            target.previousElementSibling.value++;
            var id = target.parentNode.parentNode.getAttribute("data-id");
            //修改localStorage中这个id的num
            for (var i = 0; i < this.obj.length; i++) {
                if (this.obj[i].id == id) {
                    this.obj[i].num = target.previousElementSibling.value;
                    console.log(this.obj);
                    localStorage.setItem("dgoods", JSON.stringify(this.obj));
                }
            }
            var sum1 = target.previousElementSibling.value * target.parentNode.previousElementSibling.innerText.substr(1);
            target.parentNode.nextElementSibling.innerText = "￥" + sum1.toFixed(2);
        }
        //删除商品
        if (target.tagName == "A" && target.className == "del") {
            var id = target.parentNode.parentNode.getAttribute("data-id");
            target.parentNode.parentNode.remove();
            for (var i = 0; i < this.obj.length; i++) {
                if (this.obj[i].id == id) {
                    this.obj.splice(i, 1);
                    console.log(this.obj);
                    localStorage.setItem("dgoods", JSON.stringify(this.obj));
                }
            }
        }
        //全选与反选
        var aAll = document.querySelectorAll(".all");
        var aSingle = document.querySelectorAll(".single");
        // 如果是全选时
        if (target.className == "all") {
            // 遍历所有的商品选中状态为选中
            for (var i = 0; i < aSingle.length; i++) {
                aSingle[i].checked = target.checked;
            }
            // 遍历所有的全选也为选中
            for (var j = 0; j < aAll.length; j++) {
                aAll[j].checked = target.checked;
            }
        }
        // 反选时
        if (target.className == "single") {
            var bStop = true;
            // 遍历所有商品是否为选中状态
            for (var i = 0; i < aSingle.length; i++) {
                if (!aSingle[i].checked) {
                    // 只要有一件商品未选中 就不全选
                    bStop = false;
                    break;
                }
            }
            // 当所有商品为全选中状态时，全选也都为选中状态
            for (var j = 0; j < aAll.length; j++) {
                aAll[j].checked = bStop;
            }
        }
        // 计算总计
        var totalSum = 0;
        // 遍历所有处于选中状态的商品，把商品小计累加
        for (var i = 0; i < aSingle.length; i++) {
            if (aSingle[i].checked) {
                totalSum += Number(aSingle[i].parentNode.parentNode.parentNode.children[4].innerText.substr(1));
            }
        }
        // 渲染总计
        var oTotal = document.querySelector(".total");
        oTotal.children[1].innerText = "总价:￥" + totalSum.toFixed(2);
    }
}

new Shoppingcart();