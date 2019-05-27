const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const cssMin = require("gulp-clean-css");
const connect = require("gulp-connect");
const watch = require("gulp-watch");
//转存common
gulp.task("changeCommonSrc",()=>{
    gulp.src("./src/js/js/common/common.js")
    .pipe(gulp.dest("./dist/js/js/common"))
})
//转存lib
gulp.task("changeLibSrc",()=>{
    gulp.src("./src/js/lib/*.js")
    .pipe(gulp.dest("./dist/js/lib"))
})
//转存压缩pagejs
gulp.task("pagejs",()=>{
    gulp.src("./src/js/js/page/*.js")
    .pipe(babel({
        　　　　presets: ['@babel/env']
        　　}))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js/js/page"))
    .pipe(connect.reload())
})
//转存压缩css
gulp.task("cssMin",()=>{
    gulp.src("./src/css/*.css")
    .pipe(cssMin())
    .pipe(gulp.dest("./dist/css"))
    .pipe(connect.reload())
})
//转存html
gulp.task('copy1',()=>{
    gulp.src("./src/html/*.html")
    .pipe(gulp.dest('./dist/html'))
    .pipe(connect.reload())
})
gulp.task("copy2",()=>{
    gulp.src("./src/*.html")
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
})
//图片转存
gulp.task("img",()=>{
    gulp.src("./src/imgs/*")
    .pipe(gulp.dest("./dist/imgs"))
})
//php转存
gulp.task("php",()=>{
    gulp.src("./src/php/*")
    .pipe(gulp.dest("./dist/php"))
})

//配置服务
gulp.task("server",()=>{
    connect.server({
        root:"./src",
        port:"8989",
        livereload:true
    })
})
//监听
gulp.task("watch",()=>{
    function gulpWatch(src,gulpTask){
        return watch(src,()=>{
            gulp.start(gulpTask);
        })
    }
    gulpWatch("./src/js/js/page/*.js","pagejs")
    gulpWatch("./src/css/*.css","cssMin")
    gulpWatch("./src/html/*.html","copy1")
    gulpWatch("./src/*.html","copy2")
    gulpWatch("./src/php/*","php")
})

// gulp.task("watch",()=>{
//     gulp.watch("./src/js/js/page/*.js",["pagejs"])
//     gulp.watch("./src/css/*.css",["cssMin"])
//     gulp.watch("./src/html/*.html",["copy1"])
//     gulp.watch("./src/*.html",["copy2"])
// })
//出口任务
gulp.task("default",["server","watch","changeCommonSrc","changeLibSrc","img"])