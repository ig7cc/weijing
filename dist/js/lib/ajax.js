function axios(options) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        //数据处理
        var str = "";
        for (var key in options.data) {
            str += "&" + key + "=" + options.data[key];
        }


        if (options.method == "get") {
            
            var url = options.url + "?" + str.slice(1);
            xhr.open("get", url);
            xhr.send();

        } else {
            xhr.open("post",options.url);

            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.send(str.slice(1));
        }
        

        var iNow = new Date().getTime();
        xhr.onreadystatechange = function () {
            var d = new Date().getTime();
            if (xhr.readyState == 4 && xhr.status == 200) {
                //当获取数据成功后将数据传递resolve中
                
                    resolve(JSON.parse(xhr.responseText));
            }

            if(d - iNow >=10000){
                //当获取数据失败后将失败的结果传递到reject中
                if (xhr.readyState !=4 || xhr.status != 200) {
                    var obj = {
                        state:xhr.readyState,
                        status:xhr.status
                    }
                    reject(obj);
                }
            }
               
            

        }
    })

}