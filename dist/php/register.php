<?php
    include('public.php');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "select * from users where username = '$username'";
    $res = mysqli_query($con,$sql);
    $arr = mysqli_fetch_assoc($res);
    if(count($arr)){
        echo json_encode(array(
            "status"=>false,
            "info"=>"用户名已存在"
        ));
    }else{
        $register = "insert into users (username,password) values ('$username','$password')";
        $result = mysqli_query($con,$register);
        if($result){
            echo json_encode(array(
                "status"=>true,
                "info"=>"注册成功"
            ));
        }else{
            echo json_encode(array(
                "status"=>false,
                "info"=>"注册失败"
            ));
        }
    }


?>