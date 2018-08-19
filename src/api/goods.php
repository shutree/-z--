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
    $conn->set_charset('utf8');
    $sql = "select * from goodslist";

    // 执行sql语句
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    // print_r($row);

    echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>