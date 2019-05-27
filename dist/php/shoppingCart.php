<?php
    include("public.php");
    $sql = "select * from dgoods";
    $res = mysqli_query($con,$sql);
    $data = array();
    while($arr = mysqli_fetch_assoc($res)){
        array_push($data,$arr);
    }
    echo json_encode($data);

?>