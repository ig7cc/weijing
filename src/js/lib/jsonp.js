function handle(data) {
    console.log(data);
    var n = parseInt(Math.random() * 8);
    document.body.style.background = "url(" + data.images[n].url + ")";
}


function Fn() {
    this.init();
}
Fn.prototype = {
    init() {
        this.createScript();
    },
    createScript() {
        var script = document.createElement("script");
        script.src = "http://api.asilu.com/bg?callback=handle";
        document.body.appendChild(script);
        script.onload = this.removeScript;
    },
    removeScript() {
        this.remove();
    }
}
new Fn();




