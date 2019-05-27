<?php
    include('public.php');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "select * from users where username = '$username'";
    $res = mysqli_query($con,$sql);
    $arr = mysqli_fetch_assoc($res);
    if(count($arr)){
        if($arr['password'] == $password){
            echo json_encode(array(
                "status"=>true,
                "info"=>"登录成功"
            ));
        }else{
            echo json_encode(array(
                "status"=>false,
                "info"=>"密码错误"
            ));
        }
    }else{
        echo json_encode(array(
            "status"=>false,
            "info"=>"用户名不存在"
        ));   
    }


?>