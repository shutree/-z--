<?php
    // 配置参数
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'goods';

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error){
        // 输出信息并结束连接
        die("连接失败: " . $conn->connect_error);
    }
    // 设置字符集
    // $conn->set_charset('utf8');

?>