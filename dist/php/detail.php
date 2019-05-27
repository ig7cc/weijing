<?php
    include('public.php');
    $id = $_GET["id"];
    $sql = "select * from dgoods where did = $id";
    $res = mysqli_query($con,$sql);
    $arr = mysqli_fetch_assoc($res);
    echo json_encode($arr);

?>