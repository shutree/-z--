<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'goods';


    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        // 输出信息并结束连接
        die("连接失败: " . $conn->connect_error);
    }
    $sql = "select * from goods";

    // 执行sql语句
    $result = $conn->query($sql);


    

?>