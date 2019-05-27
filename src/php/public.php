<?php
    header("content-type:text/html;charset=utf8");
    //服务器的地址
    $db_hostname = "localhost";

    //服务器的用户名
    $db_username = "root";

    //服务器的密码
    $db_password = "root";

    //你需要链接的数据库
    $db_name = "db_1904";

    //链接数据库
    $con = new mysqli($db_hostname,$db_username,$db_password,$db_name);


    //判断是否链接成功
    if($con->connect_error){
        die('链接失败'.$con->connect_error);
    }

    //设置数据库编码格式
    $con->query("set names utf8"); 

?>